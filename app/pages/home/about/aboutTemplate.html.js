(function (wndw) {
var jadify = function (jade) {
return function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"side-nav\"></div><div class=\"about-body\"></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/about/aboutTemplate.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates.aboutTemplate= jadify(wndw.jade.helpers);
}(window));