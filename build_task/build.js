module.exports = function(gulp, config, task) {

    var gp_concat = require('gulp-concat'),
        gp_uglify = require('gulp-uglify'),
        del = require('del');

    gulp.task('clean', task.clean = function() {
        return del(['./dist']);
    });

    gulp.task('build-template', task.buildTemplate = function() {
        return gulp.src(config.src.template + '/**/**.html').pipe(gulp.dest(config.dist.template));
    });

    gulp.task('build-lib', task.buildLib = function() {
        return gulp.src(config.src.lib, { base: './node_modules' }).pipe(gulp.dest(config.dist.lib));
    });

    gulp.task('build-assets', task.buildAssets = function() {
        return gulp.src(config.src.assets + '/**/**.**').pipe(gulp.dest(config.dist.assets));
    });

    gulp.task('build-data', task.buildData = function() {
        return gulp.src(config.src.data + '/**/**.**').pipe(gulp.dest(config.dist.data));
    });

    gulp.task('build-js', ['clean'], task.buildJs = function() {
        return gulp.src([config.src.js + '/**/**.js'])
            .pipe(gp_concat('app.js'))
            .pipe(gulp.dest(config.dist.js));
    });

    gulp.task('build-js-minify', ['clean'], task.buildJsMinify = function() {
        return gulp.src([config.src.js + '/**/**.js'])
            .pipe(gp_concat('app.js'))
            .pipe(gp_uglify())
            .pipe(gulp.dest(config.dist.js));
    });


    gulp.task('build-index', task.buildIndex = function() {
        return gulp.src('src/index.html').pipe(gulp.dest('dist'));
    });

    gulp.task('build', ['build-js'], task.build = function() {
        task.buildIndex();
        task.buildTemplate();
        task.buildLib();
        task.buildAssets();
        task.buildData();
        task.buildJs();
    });

    gulp.task('build-minify', ['build'], task.buildMinify = function() {
        task.buildIndex();
        task.buildTemplate();
        task.buildLib();
        task.buildAssets();
        task.buildData();
        task.buildJsMinify();
    });
};