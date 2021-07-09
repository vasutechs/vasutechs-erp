module.exports = function (config) {
    var gulp = require('gulp');
    var gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    ngHtml2Js = require("gulp-ng-html2js"),
    del = require('del'),
    fs = require('fs'),
    AdmZip = require('adm-zip'),
    appConfig = JSON.parse(fs.readFileSync('./src/appConfig.json', 'utf8')),
    applyAppConfig = function () {
        if (config.release.status) {
            delete appConfig.serverAuth;
            delete appConfig.modules.controllers.login.form.fields.appCustomer;
            delete appConfig.modules.controllers.superAdmin;
            appConfig.appCustomer = config.release.releaseProjectData.id;
            appConfig.appModules = config.release.releaseProjectData.appModules;
            if (!config.release.allModule) {
                for (var i in appConfig.modules.controllers) {
                    var module = appConfig.modules.controllers[i];
                    var isSubModule = false;
                    if (!module.page) {
                        for (var j in module) {
                            if (typeof(module[j]) === 'object') {
                                if (!module.defaultRelease && !appConfig.appModules.includes(i + '/' + j) && !appConfig.appModules.includes(i + '/**')) {
                                    delete appConfig.modules.controllers[i][j];
                                } else {
                                    isSubModule = true;
                                    appConfig.modules.controllers[i][j].show = true;
                                }
                            }
                        }
                    }
                    if (!appConfig.appModules.includes(i) && !isSubModule && !module.defaultRelease) {
                        delete appConfig.modules.controllers[i];
                    } else {
                        appConfig.modules.controllers[i].show = true;
                    }
                }

            }
        }
        return JSON.stringify(appConfig);
    },
    getDefaultSrcFiles = function () {
        var defaultSrcJsFiles = config.src.defaultSrcJsFiles;
        applyAppConfig();
        if (config.release.status && !config.release.allModule) {
            for (var i in appConfig.modules.controllers) {
                var module = appConfig.modules.controllers[i];
                if (!module.page) {
                    for (var j in module) {
                        if (module.show) {
                            defaultSrcJsFiles.push('./src/js/controllers/' + appConfig.modules.controllers[i].id + '/' + appConfig.modules.controllers[i][j].id + '**');
                        }
                    }
                }
                if (module.show) {
                    defaultSrcJsFiles.push('./src/js/controllers/' + appConfig.modules.controllers[i].id + '**');
                }
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
            defaultSrcJsFiles: ['./src/js/boot.js', './src/js/services/**.**', './src/js/factory/**.**', './src/js/components/**.**'],
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
                'start**',
                'build_tasks/app.js',
                'build_tasks/localJsonDbApi.js',
                'build_tasks/dbApi.js',
                'build_tasks/config.js'
            ]
        }
    });

    config.task.releaseProject = function (req, res, releaseProjectData) {
        config.dist.path = config.release.dist;
        if (releaseProjectData && releaseProjectData.appModules && releaseProjectData.appModules.includes('all')) {
            config.release.allModule = true;
        }

        config.release.status = true;
        config.release.releaseProjectData = releaseProjectData;
        config.task.buildProject();

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
        return gulp.src(getDefaultSrcFiles(), {
            allowEmpty: true
        })
        .pipe(gp_concat('boot.js'))
        .pipe(replace('STATIC_CONFIG', applyAppConfig))
        .pipe(gulp.dest(config.dist.path + '/js'));
    });

    gulp.task('build-js-minify', config.task.buildJsMinify = () => {
        return gulp.src(getDefaultSrcFiles(), {
            allowEmpty: true
        })
        .pipe(gp_concat('boot.js'))
        .pipe(replace('STATIC_CONFIG', applyAppConfig))
        .pipe(gp_uglify())
        .pipe(gulp.dest(config.dist.path + '/js'));
    });

    gulp.task('build', config.task.build = gulp.series('clean', 'build-template', 'build-assets', 'build-js', 'clean-template'));

    gulp.task('build-minify', config.task.buildMinify = gulp.series('clean', 'build-template', 'build-assets', 'build-js-minify', 'clean-template'));

    gulp.task('build-relase-package-json', buildReleaseCreateFiles = (done) => {
        var packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        delete packageJson.scripts['app-build'];
        delete packageJson.scripts['app-qa'];
        delete packageJson.devDependencies['gulp'];
        delete packageJson.devDependencies['gulp-concat'];
        delete packageJson.devDependencies['gulp-ng-html2js'];
        delete packageJson.devDependencies['gulp-replace'];
        delete packageJson.devDependencies['gulp-uglify'];
        fs.writeFile(config.release.path + '/package.json', JSON.stringify(packageJson), function (err, result) {
            if (err)
                console.log('error', err);
        });
        done();
    });

    gulp.task('build-release-files', buildReleaseFiles = () => {
        return gulp.src(config.release.defaultFiles, {
            base: "."
        })
        .pipe(gulp.dest(config.release.path));
    });
    gulp.task('build-release-data', buildReleaseFiles = () => {
        var appCustomerData = './data/appCustomer-' + config.release.releaseProjectData.id + '/**';
        return gulp.src(appCustomerData, {
            base: "."
        })
        .pipe(gulp.dest(config.release.path));
    });

    gulp.task('build-project-zip', buildProjectZip = (done) => {
        const zip = new AdmZip();
        zip.addLocalFolder(config.release.path);
        const data = zip.toBuffer();
        del([config.release.path]);
        config.apiProRes(data);
        done();
    });
    gulp.task('build-project', config.task.buildProject = gulp.series('build', 'build-relase-package-json', 'build-release-files', 'build-release-data', 'build-project-zip'));
};
