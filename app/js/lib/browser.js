! function (wndw) {
  function BrowserBanner($, UserAgent) {
    function browserFileAccept(inputButton) {
      var userAgent = new UserAgent();
      if ("safari" == userAgent.browser_name.toLowerCase()) {
        $(inputButton).removeAttr("accept");
      }
    }

    function isSupportedBrowser() {
      // Assume supported, and just return false for browser versions
      // that we definitely have no interest in supporting.
      var userAgent = new UserAgent();
      if (userAgent.browser_name == 'ie' && userAgent.browser_version < 9) {
        return false;
      }
      if (userAgent.browser_name == 'firefox' && userAgent.browser_version < 12) {
        return false;
      }
      if (userAgent.browser_name == 'safari' && userAgent.browser_version < 5) {
        return false;
      }

      return true;
    }

    function maybeShowBanner() {
      if (!isSupportedBrowser()) {
        if ($('.tmpst-browser-banner').length > 0) return;
        var $browserBanner = $('<div class="tmpst-browser-banner">');
        $browserBanner.css({
          'text-align': 'center',
          'font-size': '16px',
          'padding': '10px 0px',
          'background': '#FFEEA9',
          'margin-top': '-100px',
          'border-bottom': '1px solid #CCC'
        });
        $browserBanner.html('You are using an unsupported browser, so some features may not work. <br> Please upgrade to a <a style="font-size:larger" href="http://www.google.com/chrome" target="_blank">Google Chrome</a> <a style="font-size:larger" href="http://www.firefox.com/" target="_blank">Firefox</a> or <a style="font-size:larger" href="http://www.apple.com/safari/" target="_blank">Safari</a>.');
        $(document.body).prepend($browserBanner);
        $browserBanner.animate({
          'margin-top': "+=100px"
        }, 1000)
      }
    }

    $(document).ready(maybeShowBanner);

    return {
      isSupportedBrowser: isSupportedBrowser,
      browserFileAccept: browserFileAccept
    }
  }
  if ("function" == typeof define && define.amd) define(['jquery', 'js/lib/useragent'], function ($, UserAgent) {
    return new BrowserBanner($, UserAgent)
  });
  else new BrowserBanner(wndw.$, wndw.UserAgent)
}(window);