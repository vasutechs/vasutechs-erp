module.exports = function(config, task, gulp) {

    var gp_concat = require('gulp-concat'),
        gp_uglify = require('gulp-uglify'),
        replace = require('gulp-replace'),
        ngHtml2Js = require("gulp-ng-html2js"),
        del = require('del'),
        fs = require('fs'),
        applyAppConfig = function() {
            appConfig = JSON.parse(fs.readFileSync('./src/appConfig.json', 'utf8'));
            return JSON.stringify(appConfig);
        };

    gulp.task('clean', task.clean = () => {
        return del(['./dist']);
    });

    gulp.task('clean-template', task.clean = () => {
        return del(['./dist/js/template.js']);
    });

    gulp.task('build-index', task.buildIndex = () => {
        return gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
    });

    gulp.task('build-lib', task.buildLib = () => {
        return gulp.src(config.src.lib, { base: './node_modules' }).pipe(gulp.dest(config.dist.lib));
    });

    gulp.task('build-assets', task.buildAssets = () => {
        return gulp.src(config.src.assets + '/**/**.**').pipe(gulp.dest(config.dist.assets));
    });

    gulp.task('build-template', task.buildTemplate = () => {
        return gulp.src(config.src.template + '/**/**.html')
            .pipe(ngHtml2Js({
                moduleName: "erpApp",
                prefix: "template/"
            }))
            .pipe(gp_concat('template.js'))
            .pipe(gulp.dest(config.dist.js));
    });

    gulp.task('build-js', task.buildJs = () => {
        return gulp.src(config.src.defaultSrcJsFiles)
            .pipe(gp_concat('boot.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gulp.dest(config.dist.js));
    });

    gulp.task('build-js-minify', task.buildJsMinify = () => {
        return gulp.src(config.src.defaultSrcJsFiles)
            .pipe(gp_concat('boot.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gp_uglify())
            .pipe(gulp.dest(config.dist.js));
    });

    gulp.task('build', gulp.series('clean', 'build-index', 'build-template', 'build-lib', 'build-assets', 'build-js', 'clean-template'));

    gulp.task('build-minify', gulp.series('clean', 'build-index', 'build-template', 'build-lib', 'build-assets', 'build-js-minify', 'clean-template'));

    gulp.task('build-project', task.buildProject = () => {
        const stat = require('fs').statSync;
        const AdmZip = require('adm-zip');

        del(['./release']);

        gulp.src('./dist/**')
            .pipe(gulp.dest(config.releaseProject.path));

        gulp.src(config.src.defaultSrcJsFiles)
            .pipe(gp_concat('boot.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gulp.dest(config.releaseProject.js));

        newArchive(config.releaseProject.namePefix + 'Project.zip', config.releaseProject.defaultFiles);

        function newArchive(zipFileName, pathNames) {

            const zip = new AdmZip();

            pathNames.forEach(path => {
                const p = stat(path, path);
                if (p.isFile()) {
                    zip.addLocalFile(path);
                } else if (p.isDirectory()) {
                    zip.addLocalFolder(path, path);
                }
            });

            zip.writeZip(zipFileName);
        }
    });
};