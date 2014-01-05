(function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
buf.push("<div class=\"hide confirm-navigation modal\"><div class=\"modal-header\"><h2 class=\"text\">Confirm Navigation</h2></div><div class=\"modal-body\"><div class=\"confirm-navigation-message\"></div><div>Are you sure you want to leave this page?</div></div><div class=\"modal-footer\"><button data-modal-close=\"data-modal-close\" class=\"pure-button btn confirm-navigation-stay\">Stay on this Page</button><button data-modal-close=\"data-modal-close\" class=\"pure-button pure-button-error btn btn-danger confirm-navigation-leave\">Leave this Page</button></div></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("js/core/confirmNavigation.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates.confirmNavigation= jadify(wndw.jade.helpers);
}(window));