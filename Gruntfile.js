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

  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['connect:debug']);

};