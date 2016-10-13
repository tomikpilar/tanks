module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: false,
        plugins: ["transform-es2015-modules-amd"],
        comments: true
      },
      client: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'out/'
          }
        ]
      }
    },
    requirejs: {
      expand: true,
      cwd: 'bower_components/requirejs',
      src: ['src/**/*.js'],
      dest: 'out'
    },
    requirejs: {
      options: {
        baseUrl: 'out/',
        include: '../../bower_components/almond/almond',
        findNestedDependencies: true,
        preserveLicenseComments: true,
        generateSourceMaps: false
      },
      client: {
        options: {
          baseUrl: 'out/client',
          name: 'client',
          out: 'out/client/client.aio.js',
          optimize: 'none',
          userStrict: true,
          insertRequire: ["client"]
        }
      }
    },
    copy: {
      client: {
        expand: true,
        src: '**',
        cwd: 'src/static',
        dest: 'out/static'
      },
      requirejs: {
        expand: true,
        cwd: 'bower_components/requirejs',
        src: ['src/**/*.js'],
        dest: 'out'
      },
    },
    clean: {
      main: 'out/*'
    }
  });

  grunt.registerTask('default', ['clean', 'babel', 'copy', 'requirejs']);
};
