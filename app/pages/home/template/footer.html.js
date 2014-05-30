! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><div class=\"tmpst-footer-primary col-md-5\"><p>Simple Introduction</p><p class=\"tmpst-footer-copyright\">© 2014 Tmpst Inc. All Rights Reserved.</p></div><div class=\"col-md-7\"><div class=\"row\"><div class=\"tmpst-footer-column col-md-3\"><div class=\"first-label\">Company</div><a href=\"/dashboard\" class=\"tmpst-footer-link internal-home\">Dashboard</a><a href=\"/vms\" class=\"tmpst-footer-link internal-home\">VMS</a><a href=\"/services/create\" class=\"tmpst-footer-link internal-home\">Create DB</a><a href=\"/services/list\" class=\"tmpst-footer-link internal-home\">DATABASES</a></div><div class=\"tmpst-footer-column col-md-3\"><div class=\"first-label\">Company</div><a href=\"/dashboard\" class=\"tmpst-footer-link internal-home\">Dashboard</a><a href=\"/vms\" class=\"tmpst-footer-link internal-home\">VMS</a><a href=\"/services/create\" class=\"tmpst-footer-link internal-home\">Create DB</a><a href=\"/services/list\" class=\"tmpst-footer-link internal-home\">DATABASES</a></div><div class=\"tmpst-footer-column col-md-3\"><div class=\"first-label\">Company</div><a href=\"/dashboard\" class=\"tmpst-footer-link internal-home\">Dashboard</a><a href=\"/vms\" class=\"tmpst-footer-link internal-home\">VMS</a><a href=\"/services/create\" class=\"tmpst-footer-link internal-home\">Create DB</a><a href=\"/services/list\" class=\"tmpst-footer-link internal-home\">DATABASES</a></div><div class=\"tmpst-footer-column col-md-3\"><div class=\"first-label\">Company</div><a href=\"/dashboard\" class=\"tmpst-footer-link internal-home\">Dashboard</a><a href=\"/vms\" class=\"tmpst-footer-link internal-home\">VMS</a><a href=\"/services/create\" class=\"tmpst-footer-link internal-home\">Create DB</a><a href=\"/services/list\" class=\"tmpst-footer-link internal-home\">DATABASES</a></div></div></div></div></div>");;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("pages/home/template/footer.html", ["js/lib/jade", "i18n!pages/home/template/nls/footer"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["pages/home/template/footer"]= jadify(wndw.jade.helpers);
}(window));