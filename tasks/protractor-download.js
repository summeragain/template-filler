var download = require('download'),
    fs       = require('fs'),
    async    = require('async'),
    path     = require('path'),
    progress = require('multimeter')(process);

module.exports = function(grunt) {
  
  var downloadSelenium = function(config, callback) {
    if(fs.existsSync(config.seleniumServerJar)) {
      grunt.log.ok('Selenium server already downloaded.');
      return callback();
    }
    
    var total, got = 0,
        bar = progress({ before: 'selenium jar [' });
    
    download(config.seleniumServerJarUrl, '.selenium-assets')
      .on('response', function(res) {
        total = parseInt(res.headers['content-length']);
      })
      .on('data', function(data) {
        got += data.length;
        
        var percent = got / total * 100;
        bar.percent(percent);

        if (percent >= 100) {
          process.stdout.write('\n');
          callback();
        }
      })
      .on('error', function(err) {
        callback(new Error('Selenium status: ' + err))
      });
  };
  
  var downloadChromedriver = function(config, callback) {
    if(fs.existsSync(config.chromeDriver)) {
      grunt.log.ok('NodeWebkit chromedriver already downloaded.');
      return callback();
    }
    
    var total, got = 0,
        bar = progress({ before: 'chromedriver [' });
    
    download(config.chromeDriverUrl, '.selenium-assets', { extract: true, strip: 1 })
      .on('response', function(res) {
        total = parseInt(res.headers['content-length']);
      })
      .on('data', function(data) {
        got += data.length;
        
        var percent = got / total * 100;
        bar.percent(percent);

        if (percent >= 100) {
          process.stdout.write('\n');
          grunt.log.ok('Extracting...');
          callback();
        }
      })
      .on('error', function(err) {
        callback(new Error('Chromedriver status: ' + err));
      })
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