! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"tmpst-full-canvas\"><div data-js-ui-tabs=\"data-js-ui-tabs\" class=\"tabs\"></div><div><h3 data-section=\"create\" class=\"label\">CREATE A DATABASE</h3><form id=\"instance-form\" role=\"form\" class=\"form-horizontal\"><fieldset><div class=\"form-group\"><label for=\"type\" class=\"col-sm-2 control-label\">TYPE</label><div class=\"col-sm-10\"><select name=\"type\" id=\"type\" class=\"form-control col-sm-10\"><option>MySQL 5.6</option><option>MSSQL 2012</option></select></div></div><div class=\"form-group\"><label for=\"DESCRIPTION\" class=\"col-sm-2 control-label\">DESCRIPTION</label><div class=\"col-sm-10\"><select name=\"description\" id=\"description\" class=\"form-control\"><option>Basic: Dedicate server, shared VM, 256MB memory, 2560MB storage, 30 connections</option></select></div></div><div class=\"form-group\"><label for=\"database\" class=\"col-sm-2 control-label\">DB</label><div class=\"col-sm-4\"><input type=\"text\" placeholder=\"DB\" name=\"database\" id=\"database\" class=\"form-control\"/></div></div><div class=\"form-group\"><label for=\"password\" class=\"col-sm-2 control-label\">LOGIN PASSWORD</label><div class=\"col-sm-4\"><input type=\"password\" placeholder=\"LOGIN PASSWORD\" name=\"password\" id=\"password\" class=\"form-control\"/></div></div><div class=\"form-group\"><label for=\"password-repeat\" class=\"col-sm-2 control-label\">CONFIRM PASSWORD</label><div class=\"col-sm-4\"><input type=\"password\" placeholder=\"CONFIRM PASSWORD\" name=\"password-repeat\" id=\"password-repeat\" class=\"form-control\"/></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><a class=\"btn btn-default create-instance\"><i class=\"fa fa-plus\"></i>CREATE</a></div></div><div class=\"validation-error\"></div></fieldset></form><h3 data-section=\"list\" class=\"label\">MY DATABASES</h3><div id=\"instances-container\" class=\"instances-container\"><div class=\"header-group\"><div class=\"row head-row\"><div class=\"cell number-cell\"></div><div class=\"cell\">DB</div><div class=\"cell\">TYPE</div><div class=\"cell\">PASSWORD</div><div class=\"cell\">CREATE TIME</div></div></div><div class=\"row-group\"></div></div></div></div></div>");;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("pages/home/services/servicesBody.html", ["js/lib/jade", "i18n!pages/home/services/nls/servicesBody"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["pages/home/services/servicesBody"]= jadify(wndw.jade.helpers);
}(window));