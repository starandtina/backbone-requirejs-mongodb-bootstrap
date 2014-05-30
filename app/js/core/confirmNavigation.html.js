! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"hide confirm-navigation modal\"><div class=\"modal-header\"><h2 class=\"text\">Confirm Navigation</h2></div><div class=\"modal-body\"><div class=\"confirm-navigation-message\"></div><div>Are you sure you want to leave this page?</div></div><div class=\"modal-footer\"><button data-modal-close=\"data-modal-close\" class=\"button confirm-navigation-stay\">Stay on this Page</button><button data-modal-close=\"data-modal-close\" class=\"button btn-danger confirm-navigation-leave\">Leave this Page</button></div></div>");;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("js/core/confirmNavigation.html", ["js/lib/jade", "i18n!js/core/nls/confirmNavigation"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["js/core/confirmNavigation"]= jadify(wndw.jade.helpers);
}(window));