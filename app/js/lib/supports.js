define([], function () {
  var supports = {}, prefix = "supports-";
  if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) document.documentElement.className = prefix + "svg", supports.svg = !0;
  if (window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest && navigator.userAgent.indexOf("MSIE 10.0") < 0) supports.cors = !0;
  var userAgent = navigator.userAgent.toLowerCase();
  if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) supports.accepts = !1;
  else supports.accepts = !0;
  return supports
});