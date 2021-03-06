// Karma configuration
"use strict";

const isCI = !!process.env.CI;
const browsers = isCI ? ['ChromeHeadless', 'ChromeHeadlessNoSandbox'] : ['Chrome'];
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = function( config ) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [{
      pattern: '../src/testing/testing-bootstrap.js',
      watched: false
    }],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../src/testing/testing-bootstrap.js': ['webpack']
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
      resolve: {
        extensions: ['.ts', '.js'],
        modules   : ['node_modules']
      },
      plugins: [
        new ContextReplacementPlugin(
          /\@angular(\\|\/)core(\\|\/)esm5/,
          '../src',
        ),
      ],
      module : {
        rules: [{
          test  : /\.html$/,
          loader: 'raw-loader',
        },
          {
            test   : /\.scss$/,
            use    : ['to-string-loader', 'css-loader', 'sass-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.ts$/,
            use : [{
              loader : 'ts-loader',
              options: {
                configFile: 'lib/config/tsconfig.tests.json'
              }
            },
              'angular2-template-loader'
            ]
          },
          {
            test  : /\.json$/,
            loader: 'json-loader'
          }
        ]
      }
    },

    webpackMiddleware: {
      stats: {
        chunks: false
      }
    },

    plugins: [
      require("karma-webpack"),
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-mocha-reporter'),
      require('karma-jasmine-html-reporter'),
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [isCI ? "mocha" : "kjhtml"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: !isCI,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: isCI,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,

    // PhantomJS can be super slow and cause the tests to fail due to timeout.
    // Extend default from 10s to 50s to prevent this.
    browserNoActivityTimeout: 50000
  })
};