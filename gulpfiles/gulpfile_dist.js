var gulp = require('gulp-help')(require('gulp'));
var merge = require('gulp-merge');
var inject = require('gulp-inject');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var index_deps = require('./index_deps')();

module.exports = function () {
    var dist = this;
    dist.index = function () {
        var target = gulp.src('./src/index.html');
        // It's not necessary to read the files (will speed up things), we're only after their paths: 
        var sources = gulp.src([
            'dist/lib.min.css',
            'dist/lib.min.js'
        ], { read: false, base: 'src' });

        target.pipe(inject(sources, { relative: false }))
            .pipe(gulp.dest('dist'));
    }

    dist.css = function () {
        var bowerFiles = gulp.src(index_deps.css);
        var srcFiles = gulp.src('src/**/*.css');
        merge(bowerFiles, srcFiles)
            .pipe(concat('lib.css'))
            .pipe(gulp.dest('dist'))
            .pipe(minifyCSS())
            .pipe(rename('lib.min.css'))
            .pipe(gulp.dest('dist'))
            .on('error', gutil.log);
    }

    dist.js = function () {
        var bowerFiles = gulp.src(index_deps.js, { base: 'src' });
        var srcFiles = gulp.src('src/**/*.js');
        merge(bowerFiles, srcFiles)
            .pipe(concat('lib.js'))
            .pipe(gulp.dest('dist'))
            .pipe(uglify())
            .pipe(rename('lib.min.js'))
            .pipe(gulp.dest('dist'))
            .on('error', gutil.log);
    }

    return dist;
};
