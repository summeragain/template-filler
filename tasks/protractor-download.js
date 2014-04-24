var download = require('download'),
    fs       = require('fs'),
    async    = require('async'),
    path     = require('path');

module.exports = function(grunt) {
  
  var downloadSelenium = function(config, callback) {
    if(fs.existsSync(config.seleniumServerJar)) {
      return callback();
    }
    
    download(config.seleniumServerJarUrl, '.selenium-assets')
      .on('error', function(err) {
        callback(new Error('Selenium status: ' + err))
      });
  };
  
  var downloadChromedriver = function(config, callback) {
    if(fs.existsSync(config.chromeDriver)) {
      return callback();
    }
    
    download(config.chromeDriverUrl, '.selenium-assets', { extract: true, strip: 1 })
      .on('error', function(err) {
        callback(new Error('Chromedriver status: ' + err));
      });
  };
  
  grunt.registerTask('protractor-nw-download', 'Download Selenium and NodeWebkit chromedriver.', function() {
    var done = this.async();
    
    var config = require(path.resolve(process.cwd(), 'protractor.conf.js')).config;      
    
    async.parallel([
      downloadChromedriver.bind(null, config),
      downloadSelenium.bind(null, config)
    ],
    function(err) {
      done(err);
    });

  });
  
}