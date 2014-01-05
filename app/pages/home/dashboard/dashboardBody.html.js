(function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
buf.push("<div data-js-ui-tabs=\"data-js-ui-tabs\" class=\"tabs\"></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/dashboard/dashboardBody.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates.dashboardBody= jadify(wndw.jade.helpers);
}(window));