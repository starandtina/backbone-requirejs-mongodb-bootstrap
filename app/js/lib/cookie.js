(function (e) {
    var u = function (u) {
        var t = function (t, r, n) {
            if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(r)) || null === r || void 0 === r)) {
                if (n = u.extend({}, n), (null === r || void 0 === r) && (n.expires = -1), n.path || (n.path = "/"), "number" == typeof n.expires) {
                    var i = n.expires,
                        a = n.expires = new Date;
                    a.setDate(a.getDate() + i)
                }
                return r += "", e.document.cookie = [encodeURIComponent(t), "=", n.raw ? r : encodeURIComponent(r), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
            }
            n = r || {};
            for (var s, o = n.raw ? function (e) {
                    return e
                } : decodeURIComponent, l = e.document.cookie.split("; "), c = 0; l[c]; c++) if (s = l[c].split("="), o(s[0]) === t) return o(s[1] || "");
            return null
        };
        return {
            get: t,
            set: t,
            clear: function (u, r) {
                for (var n = e.document.cookie.split("; "), i = 0; n.length > i; i++) {
                    var a = n[i].indexOf("="),
                        s = a > -1 ? n[i].substr(0, a) : n[i];
                    u && u != s || t(s, null, r)
                }
            }
        }
    };
    "function" == typeof define && define.amd ? define(["jquery"], function (e) {
        return u(e)
    }) : e !== void 0 && "undefined" == typeof ender && (e.Cookie = u(e.$))
})(window);