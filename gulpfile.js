var gulp            = require('gulp'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    csso            = require('gulp-csso');

gulp.task( 'check-and-minify-styles', function () {
    gulp.src( 'slide-pages.css' )
        .pipe( csso() )
        .pipe( rename( 'slide-pages.min.css' ) )
        .pipe( gulp.dest( '.' ) )
});

gulp.task( 'check-and-minify-scripts', function () {
    gulp.src( 'slide-pages.js' )
        .pipe( uglify() )
        .pipe( rename( 'slide-pages.min.js' ) )
        .pipe( gulp.dest( '.' ) )
});

gulp.task( 'default', ['check-and-minify-styles', 'check-and-minify-scripts'], function () {});
