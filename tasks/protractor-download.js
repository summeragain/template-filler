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
  
  var linkNodeWebkit = function(callback) {
    var dest = path.join('.selenium-assets', 'nw');
    
    if(fs.existsSync(dest)) {
      return callback();
    }
    
    var nwPath = path.resolve('node_modules', 'nodewebkit', 'nodewebkit', 'nw');
    fs.symlinkSync(path.relative('.selenium-assets', nwPath), dest);
    
    callback();
  };
  
  grunt.registerTask('protractor-nw-download', 'Download Selenium and NodeWebkit chromedriver.', function() {
    var done = this.async();
    
    var config = require(path.resolve(process.cwd(), 'protractor.conf.js')).config;      
    
    async.series([
      downloadChromedriver.bind(null, config),
      downloadSelenium.bind(null, config),
      linkNodeWebkit
    ],
    function(err) {
      done(err);
    });

  });
  
}