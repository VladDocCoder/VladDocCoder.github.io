module.exports = function(config){
    config.set({
        basePath : '../',

        files : [
            './bower_components/angular/angular.js',
            './bower_components/angular/angular-*.js',
            '../app/serve/**/*.js'
        ],

        exclude : [
            'app/bower_components/angular/angular-loader.js',
            'app/bower_components/angular/*.min.js',
            'app/bower_components/angular/angular-scenario.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })};
