! (function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),index = locals_.index,description = locals_.description,database = locals_.database,type = locals_.type,password = locals_.password;buf.push("<div class=\"cell number-cell\">" + (jade.escape(null == (jade.interp = index) ? "" : jade.interp)) + "</div><div" + (jade.attrs({ 'title':(description), "class": [('cell')] }, {"title":true})) + ">" + (jade.escape(null == (jade.interp = database) ? "" : jade.interp)) + "</div><div class=\"cell\">" + (jade.escape(null == (jade.interp = type) ? "" : jade.interp)) + "</div><div class=\"cell\">" + (jade.escape(null == (jade.interp = password) ? "" : jade.interp)) + "</div>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/services/instance.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates["pages/home/services/instance"]= jadify(wndw.jade.helpers);
}(window));