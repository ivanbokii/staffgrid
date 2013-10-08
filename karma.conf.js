// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // libraries
      'public/javascripts/vendor/jquery.min.js',
      'public/javascripts/vendor/underscore.js',
      'public/javascripts/vendor/angular.js',
      'public/javascripts/vendor/angular-mocks.js',

      // our app
      'public/javascripts/*.js',

      // tests
      'public/tests/*.js',

      // templates
      'public/templates/*.html'
    ],

    // generate js files from html templates
    preprocessors: {
      'public/templates/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'public/'
    },

    autoWatch: true,
    browsers: ['Chrome']
  });
};