! (function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),user = locals_.user;buf.push("<span class=\"account-name\">" + (jade.escape(null == (jade.interp = user.name ) ? "" : jade.interp)) + "</span><a tabindex=\"0\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-owns=\"tmpst-header-about-popup\" data-popup=\"#tmpst-header-about-popup\" data-popup-bind-open=\"mouseenter\" data-popup-item=\"a\" data-popup-direction=\"se\" class=\"tmpst-header-link tmpst-header-account\">About&nbsp;▾</a>|<a" + (jade.attrs({ 'href':('' + (user.logoutUrl) + '') }, {"href":true})) + ">logout</a><div id=\"tmpst-header-about-popup\" class=\"hide tmpst-header-popup\"><a data-popup-close=\"data-popup-close\" href=\"/\" class=\"internal-home\">Home</a><a data-popup-close=\"data-popup-close\" href=\"/dashboard\" class=\"internal-home\">Dashboard</a><a data-popup-close=\"data-popup-close\" href=\"/about\" class=\"internal-home\">About</a></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/user/user.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates["pages/home/user/user"]= jadify(wndw.jade.helpers);
}(window));