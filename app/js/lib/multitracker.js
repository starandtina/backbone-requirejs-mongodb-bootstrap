! function (wndw) {
    var module = function (_, Log) {
        var MultiTracker = function (opts) {
            var options = opts || {};
            this.trackers = {}, this.logger = options.logger || Log({
                level: 'error'
            })
        };
        MultiTracker.prototype.register = function (name, queue, type, parser) {
            this.trackers[name] = {
                queue: queue || [],
                type: type || 'key-value',
                parse: parser
            }
        }, MultiTracker.prototype.get = function (name) {
            return this.trackers[name]
        }, MultiTracker.prototype.push = function () {
            for (var trackings = arguments, k = 0; k < trackings.length; k++) {
                var tracking = _.isArray(trackings[k]) ? trackings[k] : [trackings[k]];
                for (var tracker in this.trackers) {
                    var trackEvent, i;
                    if ('google' == this.trackers[tracker].type) {
                        if ('pageview' == tracking[0])
                            for (trackEvent = ['_trackPageview'], i = 1; i < tracking.length; i++) trackEvent.push(_.isString(tracking[i]) ? tracking[i] : JSON.stringify(tracking[i]))
                    } else if ('key-value' == this.trackers[tracker].type) {
                        for (var value = [], a = 1; a < tracking.length; a++) value.push(_.isString(tracking[a]) ? tracking[a] : JSON.stringify(tracking[a]));
                        if (value.length) trackEvent = {
                            key: tracking[0],
                            value: value.join('.')
                        };
                        else trackEvent = {
                            key: tracking[0]
                        }
                    } else if ('custom' == this.trackers[tracker].type && this.trackers[tracker].parse) trackEvent = this.trackers[tracker].parse.apply(this, tracking);
                    if (trackEvent) this.trackers[tracker].queue.push(trackEvent)
                }
                this.logger.info.apply(this.logger, tracking)
            }
        };
        var external = function (options) {
            return new MultiTracker(options)
        };
        return external
    };
    if ('function' == typeof define && define.amd) define(['underscore', 'js/lib/log', 'js/lib/json2'], function (_, Log) {
        return module(_)
    });
    else wndw.MultiTracker = module(wndw._)
}(window);