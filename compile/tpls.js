tpls = {};tpls["tpl_home"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h1>Homepage...</h1>\n';
 _.each(items, function(item, i) { ;
__p += '\n    <div class="item">' +
((__t = ( item )) == null ? '' : __t) +
'</div>\n';
 }); ;
__p += '\n<section class="articles">\n\t\n</section>';

}
return __p
};