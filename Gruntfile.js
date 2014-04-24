var path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.config.set('connect', {
    debug: {
      options: {
        keepalive: true,
        base: 'assets',

        port: 3001,
        hostname: 'localhost',

        open: {
          target: 'http://localhost:<%= connect.debug.options.port%>',
          appName: 'xdg-open'
        }
      }
    }
  });
  
  grunt.config.set('protractor', {
    options: {
      configFile: path.resolve('node_modules', 'grunt-protractor-runner', 'node_modules', 'protractor', 'referenceConf.js'), // Default config file
      keepAlive: false, // If false, the grunt process stops when the test fails.
      noColor: false, // If true, protractor will not use colors in its output.
    },
    
    nw: {
      options: {
        configFile: path.resolve('protractor.conf.js'),
        
        args: {
          specs: [ 'test/unit/*Spec.js' ],
          verbose: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', [ 'connect:debug' ]);
  grunt.registerTask('test', [ 'protractor-nw-config', 'protractor-nw-download', 'protractor' ]); 
  
};