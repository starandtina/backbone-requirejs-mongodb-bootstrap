! (function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),currentTabId = locals_.currentTabId;var tabItems = [{id: '1', url: '/dashboard', label: 'Dashboard', 'icon': 'dashboard'}, {url: '/vms', label: 'Virtual Machines', id: '2', 'icon': 'bookmark'}, {url: '/gws', label: 'Gateways', id: '3', 'icon': 'bookmark'}, {url: '/services/create', label: 'Services', id: '4', 'icon': 'bookmark'}]
buf.push("<div class=\"ui-tab\"><ul class=\"tab-list\">");
// iterate tabItems
;(function(){
  var $$obj = tabItems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var tab = $$obj[$index];

if ( currentTabId == tab.id)
{
buf.push("<li class=\"tab-unit\"><a" + (jade.attrs({ 'href':("" + (tab.url) + ""), "class": [('tab-on'),('tab'),('internal-home')] }, {"href":true})) + "><i" + (jade.attrs({ "class": [("fa fa-" + (tab.icon) + "")] }, {"class":true})) + "></i>" + (jade.escape(null == (jade.interp = tab.label) ? "" : jade.interp)) + "</a></li>");
}
else
{
buf.push("<li class=\"tab-unit\"><a" + (jade.attrs({ 'href':("" + (tab.url) + ""), "class": [('tab'),('internal-home')] }, {"href":true})) + "><i" + (jade.attrs({ "class": [("fa fa-" + (tab.icon) + "")] }, {"class":true})) + "></i>" + (jade.escape(null == (jade.interp = tab.label) ? "" : jade.interp)) + "</a></li>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var tab = $$obj[$index];

if ( currentTabId == tab.id)
{
buf.push("<li class=\"tab-unit\"><a" + (jade.attrs({ 'href':("" + (tab.url) + ""), "class": [('tab-on'),('tab'),('internal-home')] }, {"href":true})) + "><i" + (jade.attrs({ "class": [("fa fa-" + (tab.icon) + "")] }, {"class":true})) + "></i>" + (jade.escape(null == (jade.interp = tab.label) ? "" : jade.interp)) + "</a></li>");
}
else
{
buf.push("<li class=\"tab-unit\"><a" + (jade.attrs({ 'href':("" + (tab.url) + ""), "class": [('tab'),('internal-home')] }, {"href":true})) + "><i" + (jade.attrs({ "class": [("fa fa-" + (tab.icon) + "")] }, {"class":true})) + "></i>" + (jade.escape(null == (jade.interp = tab.label) ? "" : jade.interp)) + "</a></li>");
}
    }

  }
}).call(this);

buf.push("</ul></div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/template/tab.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates["pages/home/template/tab"]= jadify(wndw.jade.helpers);
}(window));