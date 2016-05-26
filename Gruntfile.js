module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt); //加载所有的任务
    require('time-grunt')(grunt);

    grunt.initConfig({
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
                        'app' //主目录
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
                    'app/*.html',
                    'app/css/{,*/}*.css',
                    'app/scripts/{,*/}*.js',
                    'app/images/{,*/}*.{png,jpg}',
                ]
            }
        }
    });

    grunt.registerTask('serve', [
        'connect:server',
        'watch'
    ]);
}




module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    debugInfo: true,
                    sourcemap: true
                }, 
                files: {
                    'styles/styles.css' : 'styles/sass/styles.scss'
                }
            },
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass'],
                sourceComments: 'normal'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
}