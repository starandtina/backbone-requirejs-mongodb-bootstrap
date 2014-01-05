(function (wndw) {
    var config = {
        "environment": "production",
        "out": "js/core/config.js",
        "log": "info",
        "debug": true,
        "url": {
            "base": "",
            "api": "/api"
        },
        "version": "1.0.0",
        "dir": {
            "home": "/"
        }
    };

    if (typeof define === "function" && define.amd) {
        define([], function (Highcharts) {
            return config;
        });
    } else {
        return wndw.configure = config;
    }
})(window);