! function (wndw) {
  function UserAgent(source) {
    if (null == source) source = navigator.userAgent;
    this.source = source.replace(/^\s*/, "").replace(/\s*$/, ""), this.browser_name = browser_name(this.source), this.browser_version = browser_version(this.source), this.os = os(this.source), this.platform = platform(this.source)
  }
  var Browsers, OS, Platform, Versions, browser_name, browser_version, os, platform;
  if (Versions = {
    Firefox: /firefox\/([\d\w\.\-]+)/i,
    IE: /msie\s([\d\.]+[\d])/i,
    Chrome: /chrome\/([\d\w\.\-]+)/i,
    Safari: /version\/([\d\w\.\-]+)/i,
    Ps3: /([\d\w\.\-]+)\)\s*$/i,
    Psp: /([\d\w\.\-]+)\)?\s*$/i
  }, Browsers = {
    Konqueror: /konqueror/i,
    Chrome: /chrome/i,
    Safari: /safari/i,
    IE: /msie/i,
    Opera: /opera/i,
    PS3: /playstation 3/i,
    PSP: /playstation portable/i,
    Firefox: /firefox/i
  }, OS = {
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
  }, Platform = {
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
  }, browser_name = function (string) {
    if (Browsers.Konqueror.test(string)) return "Konqueror";
    else if (Browsers.Chrome.test(string)) return "Chrome";
    else if (Browsers.Safari.test(string)) return "Safari";
    else if (Browsers.IE.test(string)) return "IE";
    else if (Browsers.Opera.test(string)) return "Opera";
    else if (Browsers.PS3.test(string)) return "PS3";
    else if (Browsers.PSP.test(string)) return "PSP";
    else if (Browsers.Firefox.test(string)) return "Firefox";
    else return "unknown"
  }, browser_version = function (string) {
    var regex;
    switch (browser_name(string)) {
    case "chrome":
      if (Versions.Chrome.test(string)) return RegExp.$1;
      break;
    case "safari":
      if (Versions.Safari.test(string)) return RegExp.$1;
      break;
    case "firefox":
      if (Versions.Firefox.test(string)) return RegExp.$1;
      break;
    case "ie":
      if (Versions.IE.test(string)) return RegExp.$1;
      break;
    case "ps3":
      if (Versions.Ps3.test(string)) return RegExp.$1;
      break;
    case "psp":
      if (Versions.Psp.test(string)) return RegExp.$1;
      break;
    default:
      if (regex = /#\{name\}[\/ ]([\d\w\.\-]+)/i, regex.test(string)) return RegExp.$1
    }
  }, os = function (string) {
    if (OS.WindowsVista.test(string)) return "Windows Vista";
    else if (OS.Windows7.test(string)) return "Windows 7";
    else if (OS.Windows2003.test(string)) return "Windows 2003";
    else if (OS.WindowsXP.test(string)) return "Windows XP";
    else if (OS.Windows2000.test(string)) return "Windows 2000";
    else if (OS.Linux.test(string)) return "Linux";
    else if (OS.Wii.test(string)) return "Wii";
    else if (OS.PS3.test(string)) return "Playstation";
    else if (OS.PSP.test(string)) return "Playstation";
    else if (OS.OSX.test(string)) return string.match(OS.OSX)[0].replace("_", ".");
    else if (OS.Ipad.test(string)) return string.match(OS.Ipad)[0].replace("_", ".").replace("(", "");
    else if (OS.Iphone.test(string)) return string.match(OS.Iphone)[0].replace("_", ".").replace("(", "");
    else return "unknown"
  }, platform = function (string) {
    if (Platform.Windows.test(string)) return "Microsoft Windows";
    else if (Platform.Mac.test(string)) return "Apple Mac";
    else if (Platform.Android.test(string)) return "Android";
    else if (Platform.Blackberry.test(string)) return "Blackberry";
    else if (Platform.Linux.test(string)) return "Linux";
    else if (Platform.Wii.test(string)) return "Wii";
    else if (Platform.Playstation.test(string)) return "Playstation";
    else if (Platform.Ipad.test(string)) return "iPad";
    else if (Platform.Ipod.test(string)) return "iPod";
    else if (Platform.Iphone.test(string)) return "iPhone";
    else return "unknown"
  }, "function" == typeof define && define.amd) define([], function () {
    return UserAgent
  });
  else window.UserAgent = UserAgent
}(window);