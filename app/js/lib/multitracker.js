! function (wndw) {
  var module = function (_, Log) {
    var MultiTracker = function (opts) {
      var options = opts || {};
      this.trackers = {}, this.logger = options.logger || Log({
        level: 'error'
      });
    };

    MultiTracker.prototype.register = function (name, queue, type, parser) {
      this.trackers[name] = {
        queue: queue || [],
        type: type || 'key-value',
        parse: parser
      }
    };

    MultiTracker.prototype.get = function (name) {
      return this.trackers[name]
    };

    MultiTracker.prototype.push = function () {
      for (var trackings = arguments, k = 0; k < trackings.length; k++) {
        var tracking = _.isArray(trackings[k]) ? trackings[k] : [trackings[k]];
        var trackEvent;
        for (var tracker in this.trackers) {
          var trackerType = this.trackers[tracker].type;
          // as for GA
          if ('google' == trackerType) {
            if ('pageview' == tracking[0]) {
              trackEvent = ['_trackPageview'];
              for (var index = 1; index < tracking.length; index++) {
                trackEvent.push(
                  _.isString(tracking[index]) ? tracking[index] :
                  JSON.stringify(tracking[index])
                );
              }
            }
          } else if ('key-value' == trackerType) { // as for KV
            var value = [];
            for (var index = 1; index < tracking.length; index++) {
              value.push(
                _.isString(tracking[index]) ? tracking[index] :
                JSON.stringify(tracking[index])
              );
            }
            if (value.length) {
              trackEvent = {
                key: tracking[0],
                value: value.join('.')
              };
            } else {
              trackEvent = {
                key: tracking[0]
              }
            }
          } else if ('custom' == trackerType && this.trackers[tracker].parse) {
            trackEvent = this.trackers[tracker].parse.apply(this, tracking);
          }
          if (trackEvent) {
            this.trackers[tracker].queue.push(trackEvent);
          }
        }

        this.logger.info.apply(this.logger, tracking);
      }
    };
    var external = function (options) {
      return new MultiTracker(options)
    };
    return external
  };
  if ('function' == typeof define && define.amd) {
    define(['underscore', 'js/lib/log', 'js/lib/json2'], function (_, Log) {
      return module(_);
    });
  } else {
    wndw.MultiTracker = module(wndw._);
  }
}(window);