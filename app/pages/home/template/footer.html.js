(function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
buf.push("<ul class=\"footer-links\"><li>© 2013</li><li><a href=\"/about\" class=\"internal-home\">About</a></li></ul>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/template/footer.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates.footer= jadify(wndw.jade.helpers);
}(window));