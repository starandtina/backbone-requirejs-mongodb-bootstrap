! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row tmpst-full-canvas\"><div data-js-ui-tabs=\"data-js-ui-tabs\" class=\"tabs\"></div></div></div><div data-readme=\"privacy-update\" data-readme-show-count=\"10\" data-readme-show-until-closed=\"data-readme-show-until-closed\" data-readme-expires=\"June 1, 2014\" style=\"visibility: visible; display: none;\"><div><span>已经更新了其隐私政策。了解更多</span><a href=\"about\" data-readme-close=\"data-readme-close\" class=\"internal-home\">点击这里查看</a></div><div data-readme-close=\"data-readme-close\" class=\"readme-close-icon\"><i class=\"fa fa-times\"></i></div></div>");;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("pages/home/dashboard/dashboardBody.html", ["js/lib/jade", "i18n!pages/home/dashboard/nls/dashboardBody"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["pages/home/dashboard/dashboardBody"]= jadify(wndw.jade.helpers);
}(window));