(function () {
    'use strict';

    var gulp = require('gulp'),
        gulpTools = require('demandware-npm/gulp/build'),
        pkg = require('./package.json'),
        paths = pkg.paths;

    gulp.task('css', function () {
        gulpTools.css(paths.css);
    });

    gulp.task('js', function () {
        gulpTools.js(paths.js);
    });

    gulp.task('fonts', function () {
        gulpTools.fonts(paths.fonts);
    });

    gulp.task('build', ['js', 'css']);
    gulp.task('default', ['build']);
}());