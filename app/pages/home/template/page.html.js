! (function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
buf.push("<div class=\"tmpst-page\"><div id=\"header\"></div><div id=\"body\"></div><div id=\"footer\"></div></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/template/page.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates["pages/home/template/page"]= jadify(wndw.jade.helpers);
}(window));