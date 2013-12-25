(function (wndw) {
  var Browsers, OS, Platform, Versions, browser_name, browser_version, os, platform;
  Versions = {
    Firefox: /firefox\/([\d\w\.\-]+)/i,
    IE: /msie\s([\d\.]+[\d])/i,
    Chrome: /chrome\/([\d\w\.\-]+)/i,
    Safari: /version\/([\d\w\.\-]+)/i,
    Ps3: /([\d\w\.\-]+)\)\s*$/i,
    Psp: /([\d\w\.\-]+)\)?\s*$/i
  };
  Browsers = {
    Konqueror: /konqueror/i,
    Chrome: /chrome/i,
    Safari: /safari/i,
    IE: /msie/i,
    Opera: /opera/i,
    PS3: /playstation 3/i,
    PSP: /playstation portable/i,
    Firefox: /firefox/i
  };
  OS = {
    WindowsVista: /windows nt 6\.0/i,
    Windows7: /windows nt 6\.\d+/i,
    Windows2003: /windows nt 5\.2/i,
    WindowsXP: /windows nt 5\.1/i,
    Windows2000: /windows nt 5\.0/i,
    OSX: /os x (\d+)[._](\d+)/i,
    Linux: /linux/i,
    Wii: /wii/i,
    PS3: /playstation 3/i,
    PSP: /playstation portable/i,
    Ipad: /\(iPad.*os (\d+)[._](\d+)/i,
    Iphone: /\(iPhone.*os (\d+)[._](\d+)/i
  };
  Platform = {
    Windows: /windows/i,
    Mac: /macintosh/i,
    Linux: /linux/i,
    Wii: /wii/i,
    Playstation: /playstation/i,
    Ipad: /ipad/i,
    Ipod: /ipod/i,
    Iphone: /iphone/i,
    Android: /android/i,
    Blackberry: /blackberry/i
  };

  function UserAgent(source) {
    if (source == null) {
      source = navigator.userAgent;
    }
    this.source = source.replace(/^\s*/, '').replace(/\s*$/, '');
    this.browser_name = browser_name(this.source);
    this.browser_version = browser_version(this.source);
    this.os = os(this.source);
    this.platform = platform(this.source);
  }
  browser_name = function (string) {
    if (Browsers.Konqueror.test(string)) {
      return 'konqueror';
    } else if (Browsers.Chrome.test(string)) {
      return 'chrome';
    } else if (Browsers.Safari.test(string)) {
      return 'safari';
    } else if (Browsers.IE.test(string)) {
      return 'ie';
    } else if (Browsers.Opera.test(string)) {
      return 'opera';
    } else if (Browsers.PS3.test(string)) {
      return 'ps3';
    } else if (Browsers.PSP.test(string)) {
      return 'psp';
    } else if (Browsers.Firefox.test(string)) {
      return 'firefox';
    } else {
      return 'unknown';
    }
  };
  browser_version = function (string) {
    var regex;
    switch (browser_name(string)) {
    case 'chrome':
      if (Versions.Chrome.test(string)) {
        return RegExp.$1;
      }
      break;
    case 'safari':
      if (Versions.Safari.test(string)) {
        return RegExp.$1;
      }
      break;
    case 'firefox':
      if (Versions.Firefox.test(string)) {
        return RegExp.$1;
      }
      break;
    case 'ie':
      if (Versions.IE.test(string)) {
        return RegExp.$1;
      }
      break;
    case 'ps3':
      if (Versions.Ps3.test(string)) {
        return RegExp.$1;
      }
      break;
    case 'psp':
      if (Versions.Psp.test(string)) {
        return RegExp.$1;
      }
      break;
    default:
      regex = /#\{name\}[\/ ]([\d\w\.\-]+)/i;
      if (regex.test(string)) {
        return RegExp.$1;
      }
    }
  };
  os = function (string) {
    if (OS.WindowsVista.test(string)) {
      return 'Windows Vista';
    } else if (OS.Windows7.test(string)) {
      return 'Windows 7';
    } else if (OS.Windows2003.test(string)) {
      return 'Windows 2003';
    } else if (OS.WindowsXP.test(string)) {
      return 'Windows XP';
    } else if (OS.Windows2000.test(string)) {
      return 'Windows 2000';
    } else if (OS.Linux.test(string)) {
      return 'Linux';
    } else if (OS.Wii.test(string)) {
      return 'Wii';
    } else if (OS.PS3.test(string)) {
      return 'Playstation';
    } else if (OS.PSP.test(string)) {
      return 'Playstation';
    } else if (OS.OSX.test(string)) {
      return string.match(OS.OSX)[0].replace('_', '.');
    } else if (OS.Ipad.test(string)) {
      return string.match(OS.Ipad)[0].replace('_', '.');
    } else if (OS.Iphone.test(string)) {
      return string.match(OS.Iphone)[0].replace('_', '.');
    } else {
      return 'unknown';
    }
  };
  platform = function (string) {
    if (Platform.Windows.test(string)) {
      return "Microsoft Windows";
    } else if (Platform.Mac.test(string)) {
      return "Apple Mac";
    } else if (Platform.Android.test(string)) {
      return "Android";
    } else if (Platform.Blackberry.test(string)) {
      return "Blackberry";
    } else if (Platform.Linux.test(string)) {
      return "Linux";
    } else if (Platform.Wii.test(string)) {
      return "Wii";
    } else if (Platform.Playstation.test(string)) {
      return "Playstation";
    } else if (Platform.Ipad.test(string)) {
      return "iPad";
    } else if (Platform.Ipod.test(string)) {
      return "iPod";
    } else if (Platform.Iphone.test(string)) {
      return "iPhone";
    } else {
      return 'unknown';
    }
  };

  function BrowserBanner($) {
    if (!$) return;

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
        $browserBanner.html('You are using an unsupported browser, so some features may not work. <br> Please upgrade to a <a style="font-size:larger" href="http://www.google.com/chrome">Google Chrome</a> <a style="font-size:larger" href="http://www.firefox.com/">Firefox</a> or <a style="font-size:larger" href="http://www.apple.com/safari/">Safari</a>.');
        $(document.body).prepend($browserBanner);
        $browserBanner.animate({
          'margin-top': "+=100px"
        }, 1000)
      }
    }

    $(document).ready(maybeShowBanner);
  }

  if (typeof define === "function" && define.amd) {
    define(["jquery"], function ($) {
      return new BrowserBanner($);
    });
  } else {
    new BrowserBanner(wndw.$);
  }

})(window);