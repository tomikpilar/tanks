var defaultTaskOrder = ['clean', 'babel', 'copy', 'requirejs', 'run:server'];

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
    requirejs_bower: {
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
          out: 'out/server/static/client/client.aio.js',
          optimize: 'none',
          useStrict: true,
          insertRequire: ["client"]
        }
      },
      serverApp: {
        options: {
          baseUrl: 'out/server',
          name: 'serverApp',
          out: 'out/server/serverApp.aio.js',
          optimize: 'none',
          useStrict: true
        }
      }
    },
    copy: {
      client: {
        expand: true,
        src: '**',
        cwd: 'src/static',
        dest: 'out/server/static'
      },
      views: {
        expand: true,
        src: '**',
        cwd: 'src/server/views',
        dest: 'out/server/views'
      },
      requirejs: {
        expand: true,
        cwd: 'bower_components/requirejs',
        src: ['src/**/*.js'],
        dest: 'out'
      },
      server: {
        expand: true,
        cwd: 'src/server',
        src: 'server.js',
        dest: 'out/server'
      }
    },
    clean: {
      main: 'out/*'
    },
    run: {
      server: {
        cmd: "node",
        args: ["server.js"],
        options: {
          cwd: "out/server",
          wait: false
        }
      }
    },
    watch: {
      scripts: {
        files: "src/**/*.js",
        tasks: ['stop:server'].concat(defaultTaskOrder),
        options: {
          events: ['all'],
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', defaultTaskOrder.concat(['watch']));
};
