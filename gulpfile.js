var gulp = require('gulp'),
	connect = require('gulp-connect'),
    gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify'),
    del = require('del'),
    config = {
        src: {
            js: './src/js',
            template: './src/template',
            lib: './src/vendor',
            data: './src/data',
            assets: './src/assets'
        },
        dist: {
            js: './dist/js',
            template: './dist/template',
            lib: './dist/vendor',
            data: './dist/data',
            assets: './dist/assets'
        }
    };

gulp.task('clean', function() {
    return del(['./dist']);
});

gulp.task('server', function() {
    connect.server({
        name: 'Dist App',
        root: 'dist',
        port: 8000,
        livereload: true
    });
});

gulp.task('build-template', function() {
    console.log(config.src.template);
    return gulp.src(config.src.template + '/**.html').pipe(gulp.dest(config.dist.template));
});

gulp.task('build-lib', function() {
    return gulp.src(config.src.lib + '/**/**.**').pipe(gulp.dest(config.dist.lib));
});

gulp.task('build-assets', function() {
    return gulp.src(config.src.assets + '/**/**.**').pipe(gulp.dest(config.dist.assets));
});

gulp.task('build-data', function() {
    return gulp.src(config.src.data + '/**/**.**').pipe(gulp.dest(config.dist.data));
});

gulp.task('build-js', ['clean'],  function() {
    return gulp.src([config.src.js + '/**/**.js'])
        .pipe(gp_concat('app.js'))
        .pipe(gulp.dest(config.dist.js)); 
});


gulp.task('build-index', function() {
    return gulp.src('src/index.html').pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-js'], function() {
	gulp.src('src/index.html').pipe(gulp.dest('dist'));
	gulp.src(config.src.template + '/**.html').pipe(gulp.dest(config.dist.template));
	gulp.src(config.src.lib + '/**/**.**').pipe(gulp.dest(config.dist.lib));
	gulp.src(config.src.assets + '/**/**.**').pipe(gulp.dest(config.dist.assets));
	gulp.src(config.src.data + '/**/**.**').pipe(gulp.dest(config.dist.data));
});

gulp.task('build-js-minify', ['build'], function() {
    return gulp.src([config.dist.js + '/app.js'])
        .pipe(gp_uglify())
        .pipe(gulp.dest(config.dist.js));
});

gulp.task('build-minify', ['build-js-minify'], function() {

});