module.exports = function(config, task, gulp) {

    var gp_concat = require('gulp-concat'),
        gp_uglify = require('gulp-uglify'),
        replace = require('gulp-replace'),
        ngHtml2Js = require("gulp-ng-html2js"),
        del = require('del'),
        fs = require('fs'),
        AdmZip = require('adm-zip'),
        applyAppConfig = function() {
            appConfig = JSON.parse(fs.readFileSync('./src/appConfig.json', 'utf8'));
            if (config.release.status) {
                for (var i in appConfig.modules) {
                    let module = appConfig.modules[i];
                    let isSubModule = false;
                    if (!module.page) {
                        for (var j in module) {
                            if (typeof(module[j]) === 'object') {
                                if (!config.src.defaultModules.includes(i + '/' + j) && !config.src.defaultModules.includes(i + '/**')) {
                                    delete appConfig.modules[i][j];
                                } else {
                                    isSubModule = true;
                                }
                            }
                        }
                    }
                    if (!config.src.defaultModules.includes(i) && !isSubModule) {
                        delete appConfig.modules[i];
                    }
                };
            }
            return JSON.stringify(appConfig);
        },
        getDefaultSrcFiles = function() {
            var defaultSrcJsFiles = config.src.defaultSrcJsFiles;
            if (config.release.status) {
                for (var i in config.src.defaultModules) {
                    defaultSrcJsFiles.push('./src/js/controllers/' + config.src.defaultModules[i] + '/**');
                }
            } else {
                defaultSrcJsFiles.push('./src/js/controllers/**');
            }
            defaultSrcJsFiles.push(config.dist.path + '/js/template.js');
            return defaultSrcJsFiles;
        },
        buildConfig = {
            src: {
                js: './src/js',
                template: './src/template',
                defaultSrcJsFiles: ['./src/js/boot.js', './src/js/components/**.**', './src/js/factory/**.**', './src/js/services/**.**', './src/js/controllers/admin/**', './src/js/controllers/dashboard.js', './src/js/controllers/databaseUpload.js'],
                defaultModules: ['databaseUpload', 'databaseDownload', 'calendarYear', 'dashboard', 'admin/**'],
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
                    'build_tasks/server.js',
                    'package.json',
                    'start',
                    'gulpfile.js'
                ]
            }
        };
    config = Object.assign(config, buildConfig);
    config.src.defaultModules = Object.assign(config.src.defaultModules, config.release.releaseProjectData);

    gulp.task('clean', task.clean = () => {
        return del([config.dist.path]);
    });

    gulp.task('clean-template', task.clean = () => {
        return del([config.dist.path + '/js/template.js']);
    });

    gulp.task('build-assets', task.buildAssets = () => {
        return gulp.src(config.src.assets + '/**/**.**').pipe(gulp.dest(config.dist.path + '/assets'));
    });

    gulp.task('build-template', task.buildTemplate = () => {
        return gulp.src(config.src.template + '/**/**.html')
            .pipe(ngHtml2Js({
                moduleName: "erpApp",
                prefix: "template/"
            }))
            .pipe(gp_concat('template.js'))
            .pipe(gulp.dest(config.dist.path + '/js'));
    });

    gulp.task('build-js', task.buildJs = () => {
        return gulp.src(getDefaultSrcFiles(), { allowEmpty: true })
            .pipe(gp_concat('boot.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gulp.dest(config.dist.path + '/js'));
    });

    gulp.task('build-js-minify', task.buildJsMinify = () => {
        return gulp.src(getDefaultSrcFiles(), { allowEmpty: true })
            .pipe(gp_concat('boot.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gp_uglify())
            .pipe(gulp.dest(config.dist.path + '/js'));
    });

    gulp.task('build', task.build = gulp.series('clean', 'build-template', 'build-assets', 'build-js', 'clean-template'));

    gulp.task('build-minify', task.buildMinify = gulp.series('clean', 'build-template', 'build-assets', 'build-js-minify', 'clean-template'));

    gulp.task('build-release-files', buildReleaseFiles = () => {
        return gulp.src(config.release.defaultFiles, { base: "." })
            .pipe(gulp.dest(config.release.path));
    });

    gulp.task('build-project-zip', buildProjectZip = (done) => {
        const zip = new AdmZip();
        zip.addLocalFolder(config.release.path);
        const data = zip.toBuffer();
        del([config.release.path]);
        config.buildProRes(data);
        done();
    });
    gulp.task('build-project', task.buildProject = gulp.series('build-minify', 'build-release-files', 'build-project-zip'));
};