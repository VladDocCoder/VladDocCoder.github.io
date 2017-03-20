'use strict';

//var backandSync = require('../sync-module');
var connect = require('gulp-connect');
var fs = require('fs');
var gulp = require('gulp');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

var ghPages = require('gulp-gh-pages');
gulp.task('deploy', function() {
    return gulp.src('start/serve/**/*')
        .pipe(ghPages());
});

gulp.task('serve', function() {
    connect.server({
        fallback: 'index.html',
        livereload: true
    });
});

/*
gulp.task('sts', function(){
    var masterToken = "your master backand token";
    var userToken = "your user backand token";
    return backandSync.sts(masterToken, userToken);
});

gulp.task('dist',['sts'], function() {
    var folder = "./src";
    return backandSync.dist(folder);
});*/
