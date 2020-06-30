module.exports = function(config) {
    var gulp = require('gulp');
    var gp_concat = require('gulp-concat'),
        gp_uglify = require('gulp-uglify'),
        replace = require('gulp-replace'),
        ngHtml2Js = require("gulp-ng-html2js"),
        del = require('del'),
        fs = require('fs'),
        dbApi = require('./dbApi')(config),
        AdmZip = require('adm-zip'),
        applyAppConfig = function() {
            var appConfig = JSON.parse(fs.readFileSync('./src/appConfig.json', 'utf8'));
            if (config.release.status) {
                delete appConfig.serverAuth;
                appConfig.appCustomer = config.release.releaseProjectData.id;
                for (var i in appConfig.modules.controllers) {
                    let module = appConfig.modules.controllers[i];
                    let isSubModule = false;
                    if (!module.page) {
                        for (var j in module) {
                            if (typeof(module[j]) === 'object') {
                                if (!config.src.defaultModules.includes(i + '/' + j) && !config.src.defaultModules.includes(i + '/**')) {
                                    delete appConfig.modules.controllers[i][j];
                                } else {
                                    isSubModule = true;
                                }
                            }
                        }
                    }
                    if (!config.src.defaultModules.includes(i) && !isSubModule) {
                        delete appConfig.modules.controllers[i];
                    }
                };
            }
            return JSON.stringify(appConfig);
        },
        getDefaultSrcFiles = function() {
            var defaultSrcJsFiles = config.src.defaultSrcJsFiles;
            if (config.release.status) {
                for (var i in config.src.defaultModules) {
                    defaultSrcJsFiles.push('./src/js/controllers/' + config.src.defaultModules[i] + '**');
                }
            } else {
                defaultSrcJsFiles.push('./src/js/**');
            }
            defaultSrcJsFiles.push(config.dist.path + '/js/template.js');
            return defaultSrcJsFiles;
        };
    config = Object.assign(config, {
        src: {
            js: './src/js',
            template: './src/template',
            defaultSrcJsFiles: ['./src/js/boot.js', './src/js/components/**.**', './src/js/factory/**.**', './src/js/services/**.**', './src/js/controllers/admin/**', './src/js/controllers/login.js', './src/js/controllers/databaseUpload.js'],
            defaultModules: ['login', 'databaseUpload', 'databaseDownload', 'calendarYear', 'dashboard', 'admin/**'],
            assets: './src/assets'
        },
        dist: {
            path: './dist'
        },
        release: {
            path: './release',
            dist: './release/dist',
            namePefix: 'VasuTechsERP-',
            defaultFiles: [
                'index.html',
                'build_tasks/app.js',
                'build_tasks/server.js',
                'build_tasks/dbApi.js',
                'build_tasks/config.js',
                'package.json'
            ]
        }
    });

    config.task.releaseProject = function(req, res, releaseProjectData) {
        var projectName = config.release.namePefix + releaseProjectData.companyName + '.zip';
        config.dist.path = config.release.dist;
        if (releaseProjectData) {
            for (var i in releaseProjectData.mapping) {
                config.src.defaultModules.push(releaseProjectData.mapping[i].module);
            }
            config.src.defaultModules = Object.assign(config.src.defaultModules, releaseProjectData.modules);
            config.release.status = true;
            config.release.releaseProjectData = releaseProjectData;
            config.task.buildProject();
            config.buildPromise.then(function(resData) {
                res.writeHead(200, {
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename=' + projectName,
                    'Content-Length': resData.length
                });

                res.end(resData);
            });
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end();
        }
    };


    gulp.task('clean', config.task.clean = () => {
        return del([config.dist.path]);
    });

    gulp.task('clean-template', config.task.clean = () => {
        return del([config.dist.path + '/js/template.js']);
    });

    gulp.task('build-assets', config.task.buildAssets = () => {
        return gulp.src(config.src.assets + '/**/**.**').pipe(gulp.dest(config.dist.path + '/assets'));
    });

    gulp.task('build-template', config.task.buildTemplate = () => {
        return gulp.src(config.src.template + '/**/**.html')
            .pipe(ngHtml2Js({
                moduleName: "erpApp",
                prefix: "template/"
            }))
            .pipe(gp_concat('template.js'))
            .pipe(gulp.dest(config.dist.path + '/js'));
    });

    gulp.task('build-js', config.task.buildJs = () => {
        return gulp.src(getDefaultSrcFiles(), { allowEmpty: true })
            .pipe(gp_concat('boot.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gulp.dest(config.dist.path + '/js'));
    });

    gulp.task('build-js-minify', config.task.buildJsMinify = () => {
        return gulp.src(getDefaultSrcFiles(), { allowEmpty: true })
            .pipe(gp_concat('boot.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gp_uglify())
            .pipe(gulp.dest(config.dist.path + '/js'));
    });

    gulp.task('build', config.task.build = gulp.series('clean', 'build-template', 'build-assets', 'build-js', 'clean-template'));

    gulp.task('build-minify', config.task.buildMinify = gulp.series('clean', 'build-template', 'build-assets', 'build-js-minify', 'clean-template'));

    gulp.task('build-relase-package-json', buildReleaseCreateFiles = (done) => {
        //fs.writeFile(config.release.path + '/start', 'node build_tasks\\server.js --run');
        var packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        console.log(packageJson);
        delete packageJson.scripts['app-build'];
        delete packageJson.scripts['app-qa'];
        delete packageJson.scripts['app-server'];
        packageJson.scripts['app-start'] = 'npm run app-update && npm run app-node-server'
        fs.writeFile(config.release.path + '/package.json', JSON.stringify(packageJson));
        done();
    });

    gulp.task('build-release-files', buildReleaseFiles = () => {
        fs.writeFile(config.release.path + '/start.bat', 'npm run app-start-node');
        return gulp.src(config.release.defaultFiles, { base: "." })
            .pipe(gulp.dest(config.release.path));
    });
    gulp.task('build-release-data', buildReleaseFiles = () => {
        var appCustomerData = './data/appCustomer-' + config.release.releaseProjectData.id + '/**';
        return gulp.src(appCustomerData, { base: "." })
            .pipe(gulp.dest(config.release.path));
    });

    gulp.task('build-project-zip', buildProjectZip = (done) => {
        const zip = new AdmZip();
        zip.addLocalFolder(config.release.path);
        const data = zip.toBuffer();
        //del([config.release.path]);
        config.buildProRes(data);
        done();
    });
    gulp.task('build-project', config.task.buildProject = gulp.series('build', 'build-release-files', 'build-project-zip'));


    gulp.task('server', () => {
        config.task.server()
    });
};