var path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.config.set('connect', {
    test: {
      options: {
        keepalive: false,
        base: 'assets',

        port: 3002,
        hostname: 'localhost'
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
          baseUrl: 'http://localhost:3002/',
          specs: [ 'test/e2e/*Spec.js' ],
          verbose: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', [ 'nodewebkit' ]);
  grunt.registerTask('test', [ 'connect:test', 'protractor-nw-config', 'protractor-nw-download', 'protractor' ]); 
  
};