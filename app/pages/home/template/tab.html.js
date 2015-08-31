! (function (wndw) {
var jadify = function (jade, _t) {
var yudify = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_t, currentTabId, undefined) {
var tabItems = [{id: '1', url: '/dashboard', label: 'Dashboard', 'icon': 'dashboard'}, {url: '/vms', label: 'VMS', id: '2', 'icon': 'bookmark'}, {url: '/gws', label: 'Gateways', id: '3', 'icon': 'bookmark'}, {url: '/services/create', label: 'Services', id: '4', 'icon': 'bookmark'}]
buf.push("<div class=\"ui-tab\"><ul class=\"tab-list\">");
// iterate tabItems
;(function(){
  var $$obj = tabItems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var tab = $$obj[$index];

if ( currentTabId == tab.id)
{
buf.push("<li class=\"tab-unit\"><a" + (jade.attr("href", "" + (tab.url) + "", true, false)) + " class=\"tab-on tab internal-home\"><i" + (jade.cls(["fa fa-" + (tab.icon) + ""], [true])) + ">" + (jade.escape(null == (jade_interp = _t[tab.label]) ? "" : jade_interp)) + "</i></a></li>");
}
else
{
buf.push("<li class=\"tab-unit\"><a" + (jade.attr("href", "" + (tab.url) + "", true, false)) + " class=\"tab internal-home\"><i" + (jade.cls(["fa fa-" + (tab.icon) + ""], [true])) + ">" + (jade.escape(null == (jade_interp = _t[tab.label]) ? "" : jade_interp)) + "</i></a></li>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var tab = $$obj[$index];

if ( currentTabId == tab.id)
{
buf.push("<li class=\"tab-unit\"><a" + (jade.attr("href", "" + (tab.url) + "", true, false)) + " class=\"tab-on tab internal-home\"><i" + (jade.cls(["fa fa-" + (tab.icon) + ""], [true])) + ">" + (jade.escape(null == (jade_interp = _t[tab.label]) ? "" : jade_interp)) + "</i></a></li>");
}
else
{
buf.push("<li class=\"tab-unit\"><a" + (jade.attr("href", "" + (tab.url) + "", true, false)) + " class=\"tab internal-home\"><i" + (jade.cls(["fa fa-" + (tab.icon) + ""], [true])) + ">" + (jade.escape(null == (jade_interp = _t[tab.label]) ? "" : jade_interp)) + "</i></a></li>");
}
    }

  }
}).call(this);

buf.push("</ul></div>");}.call(this,"_t" in locals_for_with?locals_for_with._t:typeof _t!=="undefined"?_t:undefined,"currentTabId" in locals_for_with?locals_for_with.currentTabId:typeof currentTabId!=="undefined"?currentTabId:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
return function (locals) {
if (locals && locals._t) _t = locals._t.merge(_t);
return yudify(locals);
}
};
"function" == typeof define && define.amd ? define("pages/home/template/tab.html", ["js/lib/jade", "i18n!pages/home/template/nls/tab"], function (e, _t) {
return jadify(e, _t); 
}) : wndw.jade.templates["pages/home/template/tab"]= jadify(wndw.jade.helpers);
}(window));