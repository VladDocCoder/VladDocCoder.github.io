'use strict';

var fs = require('fs');
var gulp = require('gulp'),
    awspublish = require('gulp-awspublish');

var localConfig = {
    buildSrc: './build/**/*',
    getAwsConf: function (environment) {
        var conf = require('../../config/aws');
        if (!conf[environment]) {
            throw 'No aws conf for env: ' + environment;
        }
        if (!conf[environment + 'Headers']) {
            throw 'No aws headers for env: ' + environment;
        }
        return { keys: conf[environment], headers: conf[environment + 'Headers'] };
    }
};

gulp.task('s3:production', ['build:production'], function() {
    var awsConf = localConfig.getAwsConf('production');
    var publisher = awspublish.create(awsConf.keys);
    return gulp.src(localConfig.buildSrc)
        .pipe(awspublish.gzip({ ext: '' }))
        .pipe(publisher.publish(awsConf.headers))
        .pipe(publisher.cache())
        .pipe(publisher.sync())
        .pipe(awspublish.reporter());
});

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
