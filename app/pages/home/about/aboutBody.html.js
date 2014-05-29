! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row tmpst-full-canvas\"><About>Us</About></div></div>");;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("pages/home/about/aboutBody.html", ["js/lib/jade", "i18n!pages/home/about/nls/aboutBody"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["pages/home/about/aboutBody"]= jadify(wndw.jade.helpers);
}(window));