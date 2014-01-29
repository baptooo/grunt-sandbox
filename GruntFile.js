'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        'tpl-precompiler': {
            root : 'templates',
            ext: '.html'
        },
        uglify: {
            options: {
                sourceMap: true,
                wrap: 'tpls'
            },
            templates: {
                files: {
                    'compile/tpls.min.js': ['compile/tpls.js']
                }
            }
        },
        'ressources-includer': {
            options: {
                dest: 'index.html'
            },
            dev: {
                js: {
                    flag: 'js-includer',
                    rootdir: 'src/js/',
                    files: ['foo.js', 'bar.js', 'baz.js', 'main.js'],
                    template: '<script src="filename"></script>\r\n'
                },
                css: {
                    flag: 'css-files',
                    rootdir: 'src/css/',
                    files: ['foo.css', 'bar.css'],
                    template: '<link rel="stylesheet" type="text/css" href="filename" media="screen" />'
                }
            },
            staging: {
                js: {
                    flag: 'js-includer',
                    rootdir: 'src/js/',
                    files: ['main.min.js'],
                    template: '<script src="filename"></script>\r\n'
                },
                css: {
                    flag: 'css-files',
                    rootdir: 'src/css/',
                    files: ['main.min.css'],
                    template: '<link rel="stylesheet" type="text/css" href="filename" media="screen" />'
                }
            }
        },
        watch: {
            templates: {
                files: ['templates/**/*.html'],
                tasks: ['tpl-precompiler', 'uglify:templates']
            }
        }
    });

    // Tasks loading
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Tasks registering
    var env = grunt.option('env') || 'dev';
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['tpl-precompiler', 'ressources-includer:' + env]);
};