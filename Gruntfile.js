module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        //清除目录
        clean: {
            all: 'dist/**/*',
        },

        copy: {
            html: {
                files: [
                    { expand: true, cwd: 'src/templates/', src: ['*.html'], dest: 'dist/templates/' }
                ]
            },
            themes: {
                files: [
                    { expand: true, cwd: 'src/themes/', src: ['**/*'], dest: 'dist/themes/' }
                ]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'src/libs/',
                    filter: 'isFile',
                    flatten: true,
                    src: [
                        'zepto/zepto.min.js',
                        'Swiper/dist/js/swiper.min.js',
                        'SUI-Mobile-dev/dist/js/sm-city-picker.js',
                        'jquery/dist/jquery.min.js',
                        'jquery_lazyload/jquery.lazyload.js',
                        'SUI-Mobile-dev/dist/js/sm.min.js'
                    ],
                    dest: 'dist/themes/js/'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'src/libs/',
                    src: [
                        'Swiper/dist/css/swiper.min.css',
                        'SUI-Mobile-dev/dist/css/sm.min.css'
                    ],
                    dest: 'dist/themes/css/'
                }]
            }
        },

        //替换文本
        replace: {
            example: {
                src: ['src/templates/*.html'],
                dest: 'dist/templates/',
                replacements: [{
                    from: '<meta property="qc:admins" content="66346472564274637563673145" />',
                    to: ''
                }]
            }
        },


        // 文件合并
        concat: {
            options: {
                separator: '',
                stripBanners: true
            },
            js: {
                src: [
                    'dist/themes/js/jquery.min.js',
                    'dist/themes/js/noConflict.js',
                    'dist/themes/js/zepto.min.js',
                    'dist/themes/js/sm.min.js',
                    'dist/themes/js/sm-city-picker.js',
                    'dist/themes/js/jquery.lazyload.js',
                    'dist/themes/js/swiper.min.js',
                    'dist/themes/js/common.js'
                ],
                dest: "dist/themes/js/app.js"
            },
            css: {
                src: [
                    "dist/themes/css/**/*.css"
                ],
                dest: "dist/themes/css/app.css"
            }
        },

        //压缩JS
        uglify: {
            prod: {
                options: {
                    preserveComments: false,
                    mangle: false,
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
                    cwd: 'dist/themes/',
                    src: ['js/app.js'],
                    dest: 'dist/themes/',
                    ext: '.min.js'
                }]
            }
        },
        autoprefixer: {
            options: {
                //任务设置
                browserslist: ['last 2 versions', 'chrome', 'ie'],
                map: false,
            },
            files: {
                expand: true,
                cwd: 'dist/themes/css/',
                src: ['*.css'],
                dest: 'dist/themes/css/'
            },
        },
        //压缩CSS
        cssmin: {
            prod: {
                options: {
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/themes/',
                    src: ['css/app.css'],
                    dest: 'dist/themes/',
                    ext: '.min.css'
                }]
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
                    { expand: true, cwd: 'dist/themes/images/', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/themes/images/' }
                ]
            }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [{
                    src: [
                        'dist/**/*',
                        '!dist/templates/*.html',
                        '!dist/themes/fonts/*.{eot,svg,ttf,woff}'
                    ]
                }]
            }
        },
        // 处理html中css、js 引入合并问题
        usemin: {
            html: ['dist/templates/*.html'],
            css: ['dist/themes/css/*.css'],
            js:['dist/themes/js/*.js']
        },

        //压缩HTML
        /*htmlmin: {
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
              {expand: true, cwd: 'dist/html', src: ['*.html'], dest: 'dist/html'}
            ]
          }
        }*/
        connect: {
            options: {
                port: 9000,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729 //声明给 watch 监听的端口
            },

            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        'src' //主目录
                    ]
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
                },

                files: [ //下面文件的改变就会实时刷新网页
                    'src/tpls/*.html',
                    'src/themes/css/{,*/}*.css',
                    'src/themes/js/{,*/}*.js',
                    'src/themes/images/{,*/}*.{png,jpg}',
                ]
            }
        }

    });


    grunt.registerTask('prod', [
        'copy', //复制文件
        'concat', //合并文件
        'cssmin', //CSS压缩
        'autoprefixer',
        'uglify', //JS压缩
        // 'imagemin',             //图片压缩
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('publish', ['clean', 'prod']);

    grunt.registerTask('rep', ['replace']);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'autoprefixer',
        'cssmin',
        // 'imagemin',
        // 'filerev',
        // 'usemin'
    ]);

    grunt.registerTask('serve', [
        'connect:server',
        'watch'
    ]);

};
