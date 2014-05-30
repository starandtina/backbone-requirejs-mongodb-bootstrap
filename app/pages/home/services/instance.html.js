! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (index, description, database, type, password, createTime) {
buf.push("<div class=\"cell number-cell\">" + (jade.escape(null == (jade_interp = index) ? "" : jade_interp)) + "</div><div" + (jade.attr("title", description, true, false)) + " class=\"cell\">" + (jade.escape(null == (jade_interp = database) ? "" : jade_interp)) + "</div><div class=\"cell\">" + (jade.escape(null == (jade_interp = type) ? "" : jade_interp)) + "</div><div class=\"cell\">" + (jade.escape(null == (jade_interp = password) ? "" : jade_interp)) + "</div><div class=\"cell\">" + (jade.escape(null == (jade_interp = createTime) ? "" : jade_interp)) + "</div>");}("index" in locals_for_with?locals_for_with.index:typeof index!=="undefined"?index:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"database" in locals_for_with?locals_for_with.database:typeof database!=="undefined"?database:undefined,"type" in locals_for_with?locals_for_with.type:typeof type!=="undefined"?type:undefined,"password" in locals_for_with?locals_for_with.password:typeof password!=="undefined"?password:undefined,"createTime" in locals_for_with?locals_for_with.createTime:typeof createTime!=="undefined"?createTime:undefined));;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("pages/home/services/instance.html", ["js/lib/jade", "i18n!pages/home/services/nls/instance"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["pages/home/services/instance"]= jadify(wndw.jade.helpers);
}(window));