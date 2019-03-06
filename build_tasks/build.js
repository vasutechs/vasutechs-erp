module.exports = function(config, task, gulp) {

    var gp_concat = require('gulp-concat'),
        gp_uglify = require('gulp-uglify'),
        replace = require('gulp-replace'),
        del = require('del'),
        fs = require('fs'),
        applyAppConfig = function(){
            appConfig = JSON.parse(fs.readFileSync('./src/appConfig.json', 'utf8'));
            return JSON.stringify(appConfig);
        };

    gulp.task('clean', task.clean = function() {
        return del(['./dist']);
    });

    gulp.task('build-index', task.buildIndex = function() {
        return gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
    });

    gulp.task('build-lib', task.buildLib = function() {
        return gulp.src(config.src.lib, { base: './node_modules' }).pipe(gulp.dest(config.dist.lib));
    });

    gulp.task('build-assets', task.buildAssets = function() {
        return gulp.src(config.src.assets + '/**/**.**').pipe(gulp.dest(config.dist.assets));
    });

    gulp.task('build-template', task.buildTemplate = function() {
        return gulp.src(config.src.template + '/**/**.html').pipe(gulp.dest(config.dist.template));
    });

    gulp.task('build-js', task.buildJs = function() {
        return gulp.src(config.src.defaultSrcJsFiles)
            .pipe(gp_concat('app.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gulp.dest(config.dist.js));
    });

    gulp.task('build-js-minify', task.buildJsMinify = function() {
        return gulp.src(config.src.defaultSrcJsFiles)
            .pipe(gp_concat('app.js'))
            .pipe(replace('STATIC_CONFIG', applyAppConfig))
            .pipe(gp_uglify())
            .pipe(gulp.dest(config.dist.js));
    });

    gulp.task('build', ['clean'], task.build = function() {
        task.buildIndex();
        task.buildLib();
        task.buildAssets();
        task.buildTemplate();
        task.buildJs();
    });

    gulp.task('build-minify', ['clean'], task.buildMinify = function() {
        task.buildIndex();
        task.buildLib();
        task.buildAssets();
        task.buildTemplate();
        task.buildJsMinify();
    });

    gulp.task('build-project', task.buildProject = function() {
        const stat = require('fs').statSync;
        const AdmZip = require('adm-zip');

        del(['./release']);

        gulp.src('./dist/**')
            .pipe(gulp.dest(config.releaseProject.path));

        gulp.src(config.src.defaultSrcJsFiles)
            .pipe(gp_concat('app.js'))
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