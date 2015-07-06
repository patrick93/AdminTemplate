module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var config = {
        app: 'app'
    };
    grunt.initConfig({
        appConfig: config,
        watch: {
            ts: {
                files: ['<%= appConfig.app %>/**/*.ts'],
                tasks: ['ts']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= appConfig.app %>/**/*.html',
                    '<%= appConfig.app %>/styles/*.css',
                    '<%= appConfig.app %>/**/*.js',
                    '<%= appConfig.app %>/img/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        wiredep: {
            app: {
                src: ['<%= appConfig.app %>/index.html'],
                ignorePath: /\.\.\//
            }
        },
        ts: {
            default: {
                src: ["<%= appConfig.app %>/**/*.ts", "!node_modules/**/*.ts", "typings/**/*.d.ts"],
                options: {
                    sourceMap: false
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            server: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(config.app)
                        ];
                    }
                }
            }
        }
    });
    grunt.registerTask('server', ['ts', 'wiredep', 'connect:server', 'watch']);
};
