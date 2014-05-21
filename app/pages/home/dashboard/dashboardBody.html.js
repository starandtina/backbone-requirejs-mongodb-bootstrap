! (function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
buf.push("<div class=\"container pure-u-4-5\"><div data-js-ui-tabs=\"data-js-ui-tabs\" class=\"tabs mt20\"></div></div><div data-readme=\"privacy-update\" data-readme-show-count=\"10\" data-readme-show-until-closed=\"data-readme-show-until-closed\" data-readme-expires=\"June 1, 2014\"><div><span>已经更新了其隐私政策。了解更多</span><a href=\"about\" data-readme-close=\"data-readme-close\" class=\"internal-home\">点击这里查看</a></div><div data-readme-close=\"data-readme-close\" class=\"readme-close-icon\"><i class=\"fa fa-times\"></i></div></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/dashboard/dashboardBody.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates["pages/home/dashboard/dashboardBody"]= jadify(wndw.jade.helpers);
}(window));