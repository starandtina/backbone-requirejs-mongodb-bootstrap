! (function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),user = locals_.user;buf.push("<div class=\"container\"><div class=\"pure-u-1\"><div class=\"tmpst-header-primary\"><a class=\"internal-home tmpst-logo\">logo</a></div><div class=\"tmpst-header-secondary\"><a href=\"/dashboard\" class=\"tmpst-header-link internal-home\">Dashboard</a><a href=\"/vms\" class=\"tmpst-header-link internal-home\">VMS</a><a href=\"/services/create\" class=\"tmpst-header-link internal-home\">Create DB</a><a href=\"/services/list\" class=\"tmpst-header-link internal-home\">DATABASES</a><a tabindex=\"0\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-owns=\"tmpst-header-about-popup\" data-popup=\"#tmpst-header-about-popup\" data-popup-bind-open=\"mouseenter\" data-popup-item=\"a\" data-popup-direction=\"se\" class=\"tmpst-header-link\">About<span>&nbsp;▾</span></a><span style=\"margin:0px -2px 0px 2px;color:#717171;\">|</span><a tabindex=\"0\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-owns=\"tmpst-header-account-popup\" data-popup=\"#tmpst-header-account-popup\" data-popup-bind-open=\"mouseenter\" data-popup-item=\"a\" data-popup-direction=\"se\" class=\"tmpst-header-link tmpst-header-account tmpst-header-link, tmpst-header-account\"><span class=\"tmpst-header-account-name\">" + (jade.escape(null == (jade.interp = user.name) ? "" : jade.interp)) + "</span><span>&nbsp;▾</span></a></div></div></div><div id=\"tmpst-header-about-popup\" class=\"hide tmpst-header-popup\"><a data-popup-close=\"data-popup-close\" href=\"/\" class=\"internal-home\">Home</a><a data-popup-close=\"data-popup-close\" href=\"/dashboard\" class=\"internal-home\">Dashboard</a><a data-popup-close=\"data-popup-close\" href=\"/about/\" class=\"internal-about\">About</a></div><div id=\"tmpst-header-account-popup\" class=\"hide tmpst-header-popup\"><a data-popup-close=\"data-popup-close\" href=\"/\" class=\"internal-home\">Home</a><a data-popup-close=\"data-popup-close\" href=\"/dashboard\" class=\"internal-home\">Dashboard</a><a data-popup-close=\"data-popup-close\" href=\"/about\" class=\"internal-home\">About</a><a data-popup-close=\"data-popup-close\" href=\"/account/logout\" class=\"internal-home\">Logout</a></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/template/header.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates["pages/home/template/header"]= jadify(wndw.jade.helpers);
}(window));