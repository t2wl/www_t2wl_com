module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    //清除目录
    clean: {
      all: ['Public/dest/html/**', 'dest/*.*'],
      image: 'Public/dest/html/images',
      css: 'Public/dest/html/css/**/*',
      html: 'Public/dest/html/**/*'
      iconfont: 'Public/dest/html/iconfont'
    },

    copy: {
      html: {
        files: [
          {expand: true, cwd: 'App/mobile/view/Index', src: ['*.html'], dest: 'App/mobile/view/Index/dest'}
        ]
      },
      image: {
        files: [
          {expand: true, cwd: 'Public/src', src: ['images/*.{png,jpg,jpeg,gif}'], dest: 'Public/dest'}
        ]
      },
      iconfont: {
        files: [
          {expand: true, cwd: 'Public/src', src: ['iconfont/*.{eot,svg,ttf,woff}'], dest: 'Public/dest'}
        ]
      }
    },

    // 文件合并
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      js: {
        src: [
          "Public/src/js/*.js"
        ],
        dest: "Public/dest/js/app.js"
      },
      css:{
        src: [
          "Public/src/css/*.css"
        ],
        dest: "Public/dest/css/main.css"
      }
    },

    //压缩JS
    uglify: {
      prod: {
        options: {
          mangle: {
            except: ['require', 'exports', 'module', 'window']
          },
          compress: {
            global_defs: {
              PROD: true
            },
            dead_code: true,
            pure_funcs: [
              "console.log",
              "console.info"
            ]
          }
        },

        files: [{
            expand: true,
            cwd: 'Public/dest',
            src: ['js/*.js', '!js/*.min.js'],
            dest: 'Public/dest'
        }]
      }
    },

    //压缩CSS
    cssmin: {
      prod: {
        options: {
          report: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd: 'Public/dest',
            src: ['css/*.css'],
            dest: 'Public/dest'
          }
        ]
      }
    },

    //添加厂商前缀
   autoprefixer: {
    build: {
      }
    },

    //压缩图片
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [
          {expand: true, cwd: 'Public/dest', src: ['images/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'Public/dest'}
        ]
      }
    },

    //添加MD5
    rev: {
      options: {
          encoding: 'utf8',
          algorithm: 'md5',
          length: 8
      },
      assets: {
          files: [{
              expand: true,
              cwd: 'Public/dest',
              src: [
                  'images/**/*.{jpg,jpeg,gif,png}',
                  'css/*.css',
                  'js/*.js'
              ]
          }]
      }
    },

    // 处理html中css、js 引入合并问题
    usemin: {
      html: 'App/mobile/view/Index/dest/*.html'
    },

    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [
          {expand: true, cwd: 'App/mobile/view/Index/dest', src: ['*.html'], dest: 'App/mobile/view/Index/dest'}
        ]
      }
    }

  });


  grunt.registerTask('prod', [
    'copy',                 //复制文件
    'concat',               //合并文件
    'imagemin',             //图片压缩
    'cssmin',               //CSS压缩
    'autoprefixer',         //添加前缀
    'uglify',               //JS压缩
    'rev',                  //添加指纹
    'usemin',               //HTML处理
    'htmlmin'               //HTML压缩
  ]);
  grunt.registerTask('publish', ['clean', 'prod']);    
 /*grunt.registerTask('css', ['concat:css', 'cssmin']);
  grunt.registerTask('dev', ['csslint', 'jshint']);
  grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify']);*/
};