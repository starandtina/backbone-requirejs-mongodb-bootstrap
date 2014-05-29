! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"side-nav\"></div><div class=\"about-body\"></div>");;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("pages/home/about/aboutTemplate.html", ["js/lib/jade", "i18n!pages/home/about/nls/aboutTemplate"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["pages/home/about/aboutTemplate"]= jadify(wndw.jade.helpers);
}(window));