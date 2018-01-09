module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*=============================
    =            WATCH            =
    =============================*/

    watch: {
      html: {
        files: ['src/standings.html', 'src/html/*.html'],
        tasks: ['htmlmin', 'import', 'notify:done']
      },
      js: {
        files: ['src/js/*.jsx'],
        tasks: ['browserify', 'import', 'notify:done']
      },
      css: {
        files: ['src/scss/*.scss', 'src/scss/mixins/*.scss'],
        tasks: ['sass', 'import', 'notify:done']
      }
    },

    /*===================================
    =            MINIFY HTML            =
    ===================================*/

    htmlmin: {
      dist: {
        options: {
          gruntLogHeader: false,
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'src/html/min/template.min.html': 'src/html/template.html' // CHANGE TEMPLATE NAME
        }
      }
    },

    /*====================================
     =            COMPILE SASS            =
     ====================================*/

    sass: {
      dist: {
        options: {
          gruntLogHeader: false,
          sourcemap: 'none'
        },
        files: {
          'dist/css/standings.css': 'src/scss/standings.scss'
        }
      },
      min: {
        options: {
          gruntLogHeader: false,
          sourcemap: 'none',
          style: 'compressed'
        },
        files: {
          'dist/css/standings.min.css': 'src/scss/standings.scss'
        }
      }
    },

    /*=========================================
    =            UGLIFY JAVASCRIPT            =
    =========================================*/

    uglify: {
      dist: {
        files: {
          'dist/js/standings.min.jsx': 'dist/js/standings.jsx'
        }
      }
    },

    /*==============================
    =            IMPORT            =
    ==============================*/

    import: {
      options: {
        gruntLogHeader: false
      },
      dist: {
        files: {
          'dist/js/standings.jsx': 'src/js/standings.jsx',
          'dist/standings.ready.html': 'src/standings.html'
        }
      }
    },

    /*==================================
    =            browserify            =
    ==================================*/

    browserify: {
      dev: {
        src: ['src/js/standings.jsx'],
        dest: 'dist/js/standings.js',
        options: {
          browserifyOptions: { debug: true },
          transform: [['babelify', { presets: ['env'] }]]
        }
      }
    },

    /*==============================
    =            NOTIFY            =
    ==============================*/

    notify: {
      done: {
        options: {
          gruntLogHeader: false,
          title: 'Grunt - standings',
          message: 'DONE!'
        }
      }
    }
  });

  /*==================================
  =            LOAD TASKS            =
  ==================================*/

  require('grunt-log-headers')(grunt);
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-import');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default', ['watch']);
};
