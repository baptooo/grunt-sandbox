/*
 * Author: baptiste-rios.fr
 * Description: A lodash tpl precompiler
 */

'use strict';

// this module requires lodash
var _ = require('lodash');

module.exports = function(grunt) {
	grunt.registerTask('tpl-precompiler', 'A lodash tpl precompiler', function() {
		var config = grunt.config('tpl-precompiler');

		var _out = 'tpls = {};';
		grunt.file.recurse(config.root, function(abspath, rootdir, subdir, filename) {
			if(!filename.match(config.ext || '')) {
				return true;
			}
			var source = grunt.file.read(abspath);
			_out += 'tpls["tpl_' + filename.replace(config.ext, '') + '"] = ' + _.template(source).source + ';';
		});

		grunt.file.write('compile/tpls.js', _out);
	});
};