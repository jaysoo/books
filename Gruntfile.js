'use strict';

var LIVERELOAD_PORT = 35729;

var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});

var mountFolder = function(connect, dir) {
  connect['static'](require('path').resolve(dir));
};

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var projectConfig = {
    app: 'client/app',
    dist: 'server/public'
  };

  projectConfig.app = require('./bower.json').appPath || projectConfig.app;

  grunt.initConfig({
    project: projectConfig,
    watch: {
      coffee: {
        files: ['<%= project.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= project.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= project.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: ['<%= project.app %>/{,*/}*.html', '.tmp/styles/{,*/}*.css', '{.tmp,<%= project.app %>}/scripts/{,*/}*.js', '<%= project.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },
    connect: {
      options: {
        port: 4040,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [lrSnippet, mountFolder(connect, '.tmp'), mountFolder(connect, projectConfig.app)];
          }
        }
      },
      test: {
        options: {
          middleware: function(connect) {
            return [mountFolder(connect, '.tmp'), mountFolder(connect, 'test')];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [mountFolder(connect, projectConfig.dist)];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: ['.tmp', '<%= project.dist %>/*', '!<%= project.dist %>/.git*']
          }
        ]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', '<%= project.app %>/scripts/{,*/}*.js']
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= project.app %>/scripts',
            src: '{,*/}*.coffee',
            dest: '.tmp/scripts',
            ext: '.js'
          }
        ]
      },
      test: {
        files: [
          {
            expand: true,
            cwd: 'test/spec',
            src: '{,*/}*.coffee',
            dest: '.tmp/spec',
            ext: '.js'
          }
        ]
      }
    },
    compass: {
      options: {
        sassDir: '<%= project.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= project.app %>/images',
        javascriptsDir: '<%= project.app %>/scripts',
        fontsDir: '<%= project.app %>/styles/fonts',
        importPath: '<%= project.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: ['<%= project.dist %>/scripts/{,*/}*.js', '<%= project.dist %>/styles/{,*/}*.css', '<%= project.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}', '<%= project.dist %>/styles/fonts/*']
        }
      }
    },
    useminPrepare: {
      html: '<%= project.app %>/index.html',
      options: {
        dest: '<%= project.dist %>'
      }
    },
    usemin: {
      html: ['<%= project.dist %>/{,*/}*.html'],
      css: ['<%= project.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= project.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= project.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= project.dist %>/images'
          }
        ]
      }
    },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= project.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= project.dist %>/images'
          }
        ]
      }
    },
    cssmin: {},
    htmlmin: {
      dist: {
        options: {},
        files: [
          {
            expand: true,
            cwd: '<%= project.app %>',
            src: ['*.html', 'views/*.html'],
            dest: '<%= project.dist %>'
          }
        ]
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: '<%= project.app %>/scripts',
          mainConfigFile: '<%= project.app %>/scripts/main.js',
          stubModules: ['cs', 'text'],
          out: '<%= project.dist %>/scripts/main.js',
          optimize: 'none',
          preserveLicenseComments: false,
          generateSourceMaps: true,
          name: 'main'
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= project.app %>',
            dest: '<%= project.dist %>',
            src: ['*.{ico,png,txt}', '.htaccess', 'bower_components/**/*', 'images/{,*/}*.{gif,webp}', 'fonts/**/*', 'partials/**/*', 'views/**/*']
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= project.dist %>/images',
            src: ['generated/*']
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= project.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: ['coffee:dist', 'compass:server', 'copy:styles'],
      test: ['coffee', 'compass', 'copy:styles'],
      dist: ['coffee', 'compass:dist', 'copy:styles', 'imagemin', 'svgmin', 'htmlmin']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= project.dist %>/scripts/scripts.js': ['<%= project.dist %>/scripts/scripts.js']
        }
      }
    }
  });

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist', 'autoprefixer',
    'concat',
    'copy:dist',
    'cssmin',
    'requirejs',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};

