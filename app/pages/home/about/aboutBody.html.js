(function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
buf.push("<h1>About Pages</h1>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/about/aboutBody.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates.aboutBody= jadify(wndw.jade.helpers);
}(window));