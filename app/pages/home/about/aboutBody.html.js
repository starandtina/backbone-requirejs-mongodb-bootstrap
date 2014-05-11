! (function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
buf.push("<div class=\"container\"><div class=\"pure-u-1 tmpst-full-canvas\"><About>Us</About></div></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/about/aboutBody.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates["pages/home/about/aboutBody"]= jadify(wndw.jade.helpers);
}(window));