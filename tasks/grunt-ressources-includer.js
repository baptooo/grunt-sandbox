/*
 * Author: baptiste-rios.fr
 * Description: A grunt ressources includer task.
 */

'use strict';

module.exports = function(grunt) {
    function processInclude(config, source) {
        var ressourceTpl = config.template,
            files = config.files,
            startReg = new RegExp('<!-- ' + config.flag + '-start -->', 'i'),
            endReg = new RegExp('<!-- ' + config.flag + '-end -->', 'i'),
            startFlagLength = startReg.toString().length - 3,
            endFlagLength = endReg.toString().length - 3;

        var _out = source.substr(0, source.match(startReg).index + startFlagLength);
        files.forEach(function(filename) {
            _out += config.template.replace(/filename/i, config.rootdir + filename);
        });
        _out += source.substr(source.match(endReg).index, source.length);

        return _out;
    }

    grunt.registerTask('ressources-includer', 'A grunt ressources includer task', function() {
        var env = grunt.option('env') || 'dev',
            config = grunt.config('ressources-includer'),
            dest = config.options.dest,
            destSource = grunt.file.read(dest),
            newSource = destSource;
        
        for(var i in config[env]) {
            newSource = processInclude(config[env][i], newSource);
        }
        grunt.file.write(dest + '.save', destSource);
        grunt.file.write(dest, newSource);
    });
};