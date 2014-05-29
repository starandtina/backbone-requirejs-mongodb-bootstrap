! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"tmpst-page\"><div id=\"header\" class=\"tmpst-header\"></div><div class=\"tmpst-banner\"></div><div id=\"body\" class=\"tmpst-body\"></div><div id=\"footer\" class=\"tmpst-footer\"></div></div>");;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("pages/home/template/page.html", ["js/lib/jade", "i18n!pages/home/template/nls/page"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["pages/home/template/page"]= jadify(wndw.jade.helpers);
}(window));