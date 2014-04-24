var npm    = require('npm'),
    semver = require('semver'),
    async  = require('async'),
    fs     = require('fs'),
    path   = require('path');

module.exports = function(grunt) {
  
  var getNodeWebkitVersion = function(callback) {
    npm.load('package.json', function(err) {
      if(err) {
        callback(err);
      }
      
      npm.commands.ls(['nodewebkit'], function(err, data) {
        if(err) {
          callback(err);
        }
        
        var version = semver.clean(data.dependencies['nodewebkit'].version),
            apiVersion = version.split('.')[1];
        
        callback(null, 'v0.' + apiVersion + '.0');
      });
    });
  };
  
  var getSeleniumVersion = function(callback) {
    // TODO: get latest selenium version
    
    callback(null, '2.41');
  };
  
  var getPlatformType = function(callback) {
    // TODO: add more platforms
    
    callback(null, process.platform + '-' + process.arch);
  };
  
  grunt.registerTask('protractor-nw-config', 'Prepare config file for Protractor.', function() {
    var done = this.async();
    
    async.series([
      getNodeWebkitVersion,
      getSeleniumVersion,
      getPlatformType
    ],
    function(err, result) {
      if(err) {
        return done(err);
      }
      
      var selenium = 'selenium-server-standalone-' + result[1] + '.0.jar',
          chromedriver = 'chromedriver2_server',
          chromedriverFull = 'chromedriver2-nw-' + result[0] + '-' + result[2] + '.tar.gz';
      
      var config = {
        seleniumServerJar: path.resolve('.selenium-assets', selenium),
        seleniumServerJarUrl: 'http://selenium-release.storage.googleapis.com/' + result[1] + '/' + selenium,
        
        chromeDriver: path.resolve('.selenium-assets', chromedriver),
        chromeDriverUrl: 'https://s3.amazonaws.com/node-webkit/' + result[0] + '/' + chromedriverFull
      };
      
      fs.writeFile(path.resolve(process.cwd(), 'protractor.conf.js'), 'exports.config = ' + JSON.stringify(config, '', 2), { encoding: 'utf-8' }, function(err) {
        if(err) {
          return done(err);
        }
        
        done();
      });
    });
  });
  
}