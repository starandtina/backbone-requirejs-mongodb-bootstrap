(function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
buf.push("<div class=\"logo\"><h1>Here is your Logo</h1></div><div class=\"top-nav user\"></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/template/header.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates.header= jadify(wndw.jade.helpers);
}(window));