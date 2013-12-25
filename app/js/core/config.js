(function (wndw) {
    var config = {
        "environment": "production",
        "out": "js/core/config.js",
        "log": "error",
        "debug": false,
        "url": {
            "base": "",
            "api": "http://localhost:3000/api"
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