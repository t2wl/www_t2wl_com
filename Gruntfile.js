module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        //清除目录
        clean: {
            image: 'dist/images/**/*',
            css: 'dist/css/**/*',
            html: 'dist/tpls/**/*',
            iconfont: 'dist/fonts/**/*'
        },

        copy: {
            html: {
                files: [
                    { expand: true, cwd: '../templets/catu/', src: ['*.html'], dest: 'dist/tpls/' }
                ]
            },
            image: {
                files: [
                    { expand: true, cwd: 'src/images/', src: ['*.{png,jpg,jpeg,gif}'], dest: 'dist/images/' }
                ]
            },
            iconfont: {
                files: [
                    { expand: true, cwd: 'src/fonts/', src: ['*.{eot,svg,ttf,woff}'], dest: 'dist/fonts/' }
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
                    "src/js/*.js"
                ],
                dest: "dist/js/app.js"
            },
            css: {
                src: [
                    "src/css/*.css"
                ],
                dest: "dist/css/style.css"
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
                    cwd: 'dist/js',
                    src: ['js/*.js', '!js/*.min.js'],
                    dest: 'dist/js'
                }]
            }
        },
        autoprefixer: {
            options: {
                //任务设置
                browserslist: ['last 2 versions', 'chrome', 'ie'],
                map: true,
            },
            files: {
                expand: true,
                cwd: 'src/themes/css/',
                src: ['*.css'],
                dest: 'dist/css/'
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
                    cwd: 'dist/css/',
                    src: ['*.css'],
                    dest: 'dist/css/'
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
                    { expand: true, cwd: 'src/themes/images/', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/themes/images/' }
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
                        '!dist/tpls/*.html',
                        '!dist/fonts/*.{eot,svg,ttf,woff}'
                    ]
                }]
            }
        },
        // 处理html中css、js 引入合并问题
        usemin: {
            html: ['dist/tpls/*.html'],
            css: ['dist/css/*.css']
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
                    { expand: true, cwd: 'dist/tpls', src: ['*.html'], dest: 'dist/tpls' }
                ]
            }
        },
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
        'imagemin', //图片压缩
        'cssmin', //CSS压缩
        'uglify', //JS压缩
        'usemin', //HTML处理
        'htmlmin' //HTML压缩
    ]);

    grunt.registerTask('publish', ['clean', 'prod']);
    grunt.registerTask('build', [
        /*'clean',
        'copy',*/
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
