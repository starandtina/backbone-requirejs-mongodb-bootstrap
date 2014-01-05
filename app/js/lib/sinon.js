define([], function () {
    return function () {
        "use strict";
        var buster = function (setTimeout, B) {
            var isNode = "function" == typeof require && "object" == typeof module,
                div = "undefined" != typeof document && document.createElement("div"),
                F = function () {}, buster = {
                    bind: function bind(obj, methOrProp) {
                        var method = "string" == typeof methOrProp ? obj[methOrProp] : methOrProp,
                            args = Array.prototype.slice.call(arguments, 2);
                        return function () {
                            var allArgs = args.concat(Array.prototype.slice.call(arguments));
                            return method.apply(obj, allArgs)
                        }
                    },
                    partial: function partial(fn) {
                        var args = [].slice.call(arguments, 1);
                        return function () {
                            return fn.apply(this, args.concat([].slice.call(arguments)))
                        }
                    },
                    create: function create(object) {
                        return F.prototype = object, new F
                    },
                    extend: function extend(target) {
                        if (target) {
                            for (var i = 1, l = arguments.length, prop; l > i; ++i)
                                for (prop in arguments[i]) target[prop] = arguments[i][prop];
                            return target
                        }
                    },
                    nextTick: function nextTick(callback) {
                        if ("undefined" != typeof process && process.nextTick) return process.nextTick(callback);
                        else return setTimeout(callback, 0), void 0
                    },
                    functionName: function functionName(func) {
                        if (!func) return "";
                        if (func.displayName) return func.displayName;
                        if (func.name) return func.name;
                        var matches = func.toString().match(/function\s+([^\(]+)/m);
                        return matches && matches[1] || ""
                    },
                    isNode: function isNode(obj) {
                        if (!div) return !1;
                        try {
                            obj.appendChild(div), obj.removeChild(div)
                        } catch (e) {
                            return !1
                        }
                        return !0
                    },
                    isElement: function isElement(obj) {
                        return obj && 1 === obj.nodeType && buster.isNode(obj)
                    },
                    isArray: function isArray(arr) {
                        return "[object Array]" == Object.prototype.toString.call(arr)
                    },
                    flatten: function flatten(arr) {
                        for (var result = [], arr = arr || [], i = 0, l = arr.length; l > i; ++i) result = result.concat(buster.isArray(arr[i]) ? flatten(arr[i]) : arr[i]);
                        return result
                    },
                    each: function each(arr, callback) {
                        for (var i = 0, l = arr.length; l > i; ++i) callback(arr[i])
                    },
                    map: function map(arr, callback) {
                        for (var results = [], i = 0, l = arr.length; l > i; ++i) results.push(callback(arr[i]));
                        return results
                    },
                    parallel: function parallel(fns, callback) {
                        function cb(err, res) {
                            if ("function" == typeof callback) callback(err, res), callback = null
                        }

                        function makeDone(num) {
                            return function done(err, result) {
                                if (err) return cb(err);
                                if (results[num] = result, 0 == --remaining) cb(null, results)
                            }
                        }
                        if (0 == fns.length) return cb(null, []);
                        for (var remaining = fns.length, results = [], i = 0, l = fns.length; l > i; ++i) fns[i](makeDone(i))
                    },
                    series: function series(fns, callback) {
                        function cb(err, res) {
                            if ("function" == typeof callback) callback(err, res)
                        }

                        function callNext() {
                            if (0 == remaining.length) return cb(null, results);
                            var promise = remaining.shift()(next);
                            if (promise && "function" == typeof promise.then) promise.then(buster.partial(next, null), next)
                        }

                        function next(err, result) {
                            if (err) return cb(err);
                            else return results.push(result), callNext(), void 0
                        }
                        var remaining = fns.slice(),
                            results = [];
                        callNext()
                    },
                    countdown: function countdown(num, done) {
                        return function () {
                            if (0 == --num) done()
                        }
                    }
                };
            if ("object" == typeof process && "function" == typeof require && "object" == typeof module) {
                var crypto = require("crypto"),
                    path = require("path");
                buster.tmpFile = function (fileName) {
                    var hashed = crypto.createHash("sha1");
                    hashed.update(fileName);
                    var tmpfileName = hashed.digest("hex");
                    if ("win32" == process.platform) return path.join(process.env.TEMP, tmpfileName);
                    else return path.join("/tmp", tmpfileName)
                }
            }
            if (Array.prototype.some) buster.some = function (arr, fn, thisp) {
                return arr.some(fn, thisp)
            };
            else buster.some = function (arr, fun, thisp) {
                if (null == arr) throw new TypeError;
                arr = Object(arr);
                var len = arr.length >>> 0;
                if ("function" != typeof fun) throw new TypeError;
                for (var i = 0; len > i; i++)
                    if (arr.hasOwnProperty(i) && fun.call(thisp, arr[i], i, arr)) return !0;
                return !1
            }; if (Array.prototype.filter) buster.filter = function (arr, fn, thisp) {
                return arr.filter(fn, thisp)
            };
            else buster.filter = function (fn, thisp) {
                if (null == this) throw new TypeError;
                var t = Object(this),
                    len = t.length >>> 0;
                if ("function" != typeof fn) throw new TypeError;
                for (var res = [], i = 0; len > i; i++)
                    if (i in t) {
                        var val = t[i];
                        if (fn.call(thisp, val, i, t)) res.push(val)
                    }
                return res
            }; if (isNode) module.exports = buster, buster.eventEmitter = require("./buster-event-emitter"), Object.defineProperty(buster, "defineVersionGetter", {
                get: function () {
                    return require("./define-version-getter")
                }
            });
            return buster.extend(B || {}, buster)
        }(setTimeout, buster);
        if ("undefined" == typeof buster) var buster = {};
        if ("object" == typeof module && "function" == typeof require) buster = require("buster-core");
        if (buster.format = buster.format || {}, buster.format.excludeConstructors = ["Object", /^.$/], buster.format.quoteStrings = !0, buster.format.ascii = function () {
            function keys(object) {
                var k = Object.keys && Object.keys(object) || [];
                if (0 == k.length)
                    for (var prop in object)
                        if (hasOwn.call(object, prop)) k.push(prop);
                return k.sort()
            }

            function isCircular(object, objects) {
                if ("object" != typeof object) return !1;
                for (var i = 0, l = objects.length; l > i; ++i)
                    if (objects[i] === object) return !0;
                return !1
            }

            function ascii(object, processed, indent) {
                if ("string" == typeof object) {
                    var quote = "boolean" != typeof this.quoteStrings || this.quoteStrings;
                    return processed || quote ? '"' + object + '"' : object
                }
                if ("function" == typeof object && !(object instanceof RegExp)) return ascii.func(object);
                if (processed = processed || [], isCircular(object, processed)) return "[Circular]";
                if ("[object Array]" == Object.prototype.toString.call(object)) return ascii.array.call(this, object, processed);
                if (!object) return "" + object;
                if (buster.isElement(object)) return ascii.element(object);
                if ("function" == typeof object.toString && object.toString !== Object.prototype.toString) return object.toString();
                for (var i = 0, l = specialObjects.length; l > i; i++)
                    if (object === specialObjects[i].obj) return specialObjects[i].value;
                return ascii.object.call(this, object, processed, indent)
            }
            var hasOwn = Object.prototype.hasOwnProperty,
                specialObjects = [];
            if ("undefined" != typeof global) specialObjects.push({
                obj: global,
                value: "[object global]"
            });
            if ("undefined" != typeof document) specialObjects.push({
                obj: document,
                value: "[object HTMLDocument]"
            });
            if ("undefined" != typeof window) specialObjects.push({
                obj: window,
                value: "[object Window]"
            });
            return ascii.func = function (func) {
                return "function " + buster.functionName(func) + "() {}"
            }, ascii.array = function (array, processed) {
                processed = processed || [], processed.push(array);
                for (var pieces = [], i = 0, l = array.length; l > i; ++i) pieces.push(ascii.call(this, array[i], processed));
                return "[" + pieces.join(", ") + "]"
            }, ascii.object = function (object, processed, indent) {
                processed = processed || [], processed.push(object), indent = indent || 0;
                for (var pieces = [], properties = keys(object), prop, str, obj, is = "", length = 3, i = 0, l = indent; l > i; ++i) is += " ";
                for (i = 0, l = properties.length; l > i; ++i) {
                    if (prop = properties[i], obj = object[prop], isCircular(obj, processed)) str = "[Circular]";
                    else str = ascii.call(this, obj, processed, indent + 2);
                    str = (/\s/.test(prop) ? '"' + prop + '"' : prop) + ": " + str, length += str.length, pieces.push(str)
                }
                var cons = ascii.constructorName.call(this, object),
                    prefix = cons ? "[" + cons + "] " : "";
                return length + indent > 80 ? prefix + "{\n  " + is + pieces.join(",\n  " + is) + "\n" + is + "}" : prefix + "{ " + pieces.join(", ") + " }"
            }, ascii.element = function (element) {
                for (var tagName = element.tagName.toLowerCase(), attrs = element.attributes, attribute, pairs = [], attrName, i = 0, l = attrs.length; l > i; ++i)
                    if (attribute = attrs.item(i), attrName = attribute.nodeName.toLowerCase().replace("html:", ""), "contenteditable" != attrName || "inherit" != attribute.nodeValue) {
                        if (attribute.nodeValue) pairs.push(attrName + '="' + attribute.nodeValue + '"')
                    } else;
                var formatted = "<" + tagName + (pairs.length > 0 ? " " : ""),
                    content = element.innerHTML;
                if (content.length > 20) content = content.substr(0, 20) + "[...]";
                var res = formatted + pairs.join(" ") + ">" + content + "</" + tagName + ">";
                return res.replace(/ contentEditable="inherit"/, "")
            }, ascii.constructorName = function (object) {
                for (var name = buster.functionName(object && object.constructor), excludes = this.excludeConstructors || buster.format.excludeConstructors || [], i = 0, l = excludes.length; l > i; ++i)
                    if ("string" == typeof excludes[i] && excludes[i] == name) return "";
                    else
                if (excludes[i].test && excludes[i].test(name)) return "";
                return name
            }, ascii
        }(), "undefined" != typeof module) module.exports = buster.format;
        var sinon = function (buster) {
            function isDOMNode(obj) {
                var success = !1;
                try {
                    obj.appendChild(div), success = div.parentNode == obj
                } catch (e) {
                    return !1
                } finally {
                    try {
                        obj.removeChild(div)
                    } catch (e) {}
                }
                return success
            }

            function isElement(obj) {
                return div && obj && 1 === obj.nodeType && isDOMNode(obj)
            }

            function isFunction(obj) {
                return !!(obj && obj.constructor && obj.call && obj.apply)
            }

            function mirrorProperties(target, source) {
                for (var prop in source)
                    if (!hasOwn.call(target, prop)) target[prop] = source[prop]
            }
            var div = "undefined" != typeof document && document.createElement("div"),
                hasOwn = Object.prototype.hasOwnProperty,
                sinon = {
                    wrapMethod: function wrapMethod(object, property, method) {
                        if (!object) throw new TypeError("Should wrap property of object");
                        if ("function" != typeof method) throw new TypeError("Method wrapper should be function");
                        var wrappedMethod = object[property];
                        if (!isFunction(wrappedMethod)) throw new TypeError("Attempted to wrap " + typeof wrappedMethod + " property " + property + " as function");
                        if (wrappedMethod.restore && wrappedMethod.restore.sinon) throw new TypeError("Attempted to wrap " + property + " which is already wrapped");
                        if (wrappedMethod.calledBefore) {
                            var verb = wrappedMethod.returns ? "stubbed" : "spied on";
                            throw new TypeError("Attempted to wrap " + property + " which is already " + verb)
                        }
                        var owned = hasOwn.call(object, property);
                        return object[property] = method, method.displayName = property, method.restore = function () {
                            if (!owned) delete object[property];
                            if (object[property] === method) object[property] = wrappedMethod
                        }, method.restore.sinon = !0, mirrorProperties(method, wrappedMethod), method
                    },
                    extend: function extend(target) {
                        for (var i = 1, l = arguments.length; l > i; i += 1)
                            for (var prop in arguments[i]) {
                                if (arguments[i].hasOwnProperty(prop)) target[prop] = arguments[i][prop];
                                if (arguments[i].hasOwnProperty("toString") && arguments[i].toString != target.toString) target.toString = arguments[i].toString
                            }
                        return target
                    },
                    create: function create(proto) {
                        var F = function () {};
                        return F.prototype = proto, new F
                    },
                    deepEqual: function deepEqual(a, b) {
                        if (sinon.match && sinon.match.isMatcher(a)) return a.test(b);
                        if ("object" != typeof a || "object" != typeof b) return a === b;
                        if (isElement(a) || isElement(b)) return a === b;
                        if (a === b) return !0;
                        var aString = Object.prototype.toString.call(a);
                        if (aString != Object.prototype.toString.call(b)) return !1;
                        if ("[object Array]" == aString) {
                            if (a.length !== b.length) return !1;
                            for (var i = 0, l = a.length; l > i; i += 1)
                                if (!deepEqual(a[i], b[i])) return !1;
                            return !0
                        }
                        var prop, aLength = 0,
                            bLength = 0;
                        for (prop in a)
                            if (aLength += 1, !deepEqual(a[prop], b[prop])) return !1;
                        for (prop in b) bLength += 1;
                        if (aLength != bLength) return !1;
                        else return !0
                    },
                    functionName: function functionName(func) {
                        var name = func.displayName || func.name;
                        if (!name) {
                            var matches = func.toString().match(/function ([^\s\(]+)/);
                            name = matches && matches[1]
                        }
                        return name
                    },
                    functionToString: function toString() {
                        if (this.getCall && this.callCount)
                            for (var thisValue, prop, i = this.callCount; i--;) {
                                thisValue = this.getCall(i).thisValue;
                                for (prop in thisValue)
                                    if (thisValue[prop] === this) return prop
                            }
                        return this.displayName || "sinon fake"
                    },
                    getConfig: function (custom) {
                        var config = {};
                        custom = custom || {};
                        var defaults = sinon.defaultConfig;
                        for (var prop in defaults)
                            if (defaults.hasOwnProperty(prop)) config[prop] = custom.hasOwnProperty(prop) ? custom[prop] : defaults[prop];
                        return config
                    },
                    format: function (val) {
                        return "" + val
                    },
                    defaultConfig: {
                        injectIntoThis: !0,
                        injectInto: null,
                        properties: ["spy", "stub", "mock", "clock", "server", "requests"],
                        useFakeTimers: !0,
                        useFakeServer: !0
                    },
                    timesInWords: function timesInWords(count) {
                        return 1 == count && "once" || 2 == count && "twice" || 3 == count && "thrice" || (count || 0) + " times"
                    },
                    calledInOrder: function (spies) {
                        for (var i = 1, l = spies.length; l > i; i++)
                            if (!spies[i - 1].calledBefore(spies[i])) return !1;
                        return !0
                    },
                    orderByFirstCall: function (spies) {
                        return spies.sort(function (a, b) {
                            var aCall = a.getCall(0),
                                bCall = b.getCall(0),
                                aId = aCall && aCall.callId || -1,
                                bId = bCall && bCall.callId || -1;
                            return bId > aId ? -1 : 1
                        })
                    },
                    log: function () {},
                    logError: function (label, err) {
                        var msg = label + " threw exception: ";
                        if (sinon.log(msg + "[" + err.name + "] " + err.message), err.stack) sinon.log(err.stack);
                        setTimeout(function () {
                            throw err.message = msg + err.message, err
                        }, 0)
                    },
                    typeOf: function (value) {
                        if (null === value) return "null";
                        var string = Object.prototype.toString.call(value);
                        return string.substring(8, string.length - 1).toLowerCase()
                    }
                }, isNode = "object" == typeof module && "function" == typeof require;
            if (isNode) {
                try {
                    buster = {
                        format: require("buster-format")
                    }
                } catch (e) {}
                module.exports = sinon, module.exports.spy = require("./sinon/spy"), module.exports.stub = require("./sinon/stub"), module.exports.mock = require("./sinon/mock"), module.exports.collection = require("./sinon/collection"), module.exports.assert = require("./sinon/assert"), module.exports.sandbox = require("./sinon/sandbox"), module.exports.test = require("./sinon/test"), module.exports.testCase = require("./sinon/test_case"), module.exports.assert = require("./sinon/assert"), module.exports.match = require("./sinon/match")
            }
            if (buster) {
                var formatter = sinon.create(buster.format);
                formatter.quoteStrings = !1, sinon.format = function () {
                    return formatter.ascii.apply(formatter, arguments)
                }
            } else if (isNode) try {
                var util = require("util");
                sinon.format = function (value) {
                    return "object" == typeof value && value.toString === Object.prototype.toString ? util.inspect(value) : value
                }
            } catch (e) {}
            return sinon
        }("object" == typeof buster && buster);
        if (function (sinon) {
            function assertType(value, type, name) {
                var actual = sinon.typeOf(value);
                if (actual !== type) throw new TypeError("Expected type of " + name + " to be " + type + ", but was " + actual)
            }

            function isMatcher(object) {
                return matcher.isPrototypeOf(object)
            }

            function matchObject(expectation, actual) {
                if (null === actual || void 0 === actual) return !1;
                for (var key in expectation)
                    if (expectation.hasOwnProperty(key)) {
                        var exp = expectation[key],
                            act = actual[key];
                        if (match.isMatcher(exp)) {
                            if (!exp.test(act)) return !1
                        } else if ("object" === sinon.typeOf(exp)) {
                            if (!matchObject(exp, act)) return !1
                        } else if (!sinon.deepEqual(exp, act)) return !1
                    }
                return !0
            }

            function createPropertyMatcher(propertyTest, messagePrefix) {
                return function (property, value) {
                    assertType(property, "string", "property");
                    var onlyProperty = 1 === arguments.length,
                        message = messagePrefix + '("' + property + '"';
                    if (!onlyProperty) message += ", " + value;
                    return message += ")", match(function (actual) {
                        if (void 0 === actual || null === actual || !propertyTest(actual, property)) return !1;
                        else return onlyProperty || sinon.deepEqual(value, actual[property])
                    }, message)
                }
            }
            var commonJSModule = "object" == typeof module && "function" == typeof require;
            if (!sinon && commonJSModule) sinon = require("../sinon");
            if (sinon) {
                var matcher = {
                    toString: function () {
                        return this.message
                    }
                };
                matcher.or = function (m2) {
                    if (!isMatcher(m2)) throw new TypeError("Matcher expected");
                    var m1 = this,
                        or = sinon.create(matcher);
                    return or.test = function (actual) {
                        return m1.test(actual) || m2.test(actual)
                    }, or.message = m1.message + ".or(" + m2.message + ")", or
                }, matcher.and = function (m2) {
                    if (!isMatcher(m2)) throw new TypeError("Matcher expected");
                    var m1 = this,
                        and = sinon.create(matcher);
                    return and.test = function (actual) {
                        return m1.test(actual) && m2.test(actual)
                    }, and.message = m1.message + ".and(" + m2.message + ")", and
                };
                var match = function (expectation, message) {
                    var m = sinon.create(matcher),
                        type = sinon.typeOf(expectation);
                    switch (type) {
                    case "object":
                        if ("function" == typeof expectation.test) return m.test = function (actual) {
                            return expectation.test(actual) === !0
                        }, m.message = "match(" + sinon.functionName(expectation.test) + ")", m;
                        var str = [];
                        for (var key in expectation)
                            if (expectation.hasOwnProperty(key)) str.push(key + ": " + expectation[key]);
                        m.test = function (actual) {
                            return matchObject(expectation, actual)
                        }, m.message = "match(" + str.join(", ") + ")";
                        break;
                    case "number":
                        m.test = function (actual) {
                            return expectation == actual
                        };
                        break;
                    case "string":
                        m.test = function (actual) {
                            if ("string" != typeof actual) return !1;
                            else return -1 !== actual.indexOf(expectation)
                        }, m.message = 'match("' + expectation + '")';
                        break;
                    case "regexp":
                        m.test = function (actual) {
                            if ("string" != typeof actual) return !1;
                            else return expectation.test(actual)
                        };
                        break;
                    case "function":
                        if (m.test = expectation, message) m.message = message;
                        else m.message = "match(" + sinon.functionName(expectation) + ")";
                        break;
                    default:
                        m.test = function (actual) {
                            return sinon.deepEqual(expectation, actual)
                        }
                    }
                    if (!m.message) m.message = "match(" + expectation + ")";
                    return m
                };
                if (match.isMatcher = isMatcher, match.any = match(function () {
                    return !0
                }, "any"), match.defined = match(function (actual) {
                    return null !== actual && void 0 !== actual
                }, "defined"), match.truthy = match(function (actual) {
                    return !!actual
                }, "truthy"), match.falsy = match(function (actual) {
                    return !actual
                }, "falsy"), match.same = function (expectation) {
                    return match(function (actual) {
                        return expectation === actual
                    }, "same(" + expectation + ")")
                }, match.typeOf = function (type) {
                    return assertType(type, "string", "type"), match(function (actual) {
                        return sinon.typeOf(actual) === type
                    }, 'typeOf("' + type + '")')
                }, match.instanceOf = function (type) {
                    return assertType(type, "function", "type"), match(function (actual) {
                        return actual instanceof type
                    }, "instanceOf(" + sinon.functionName(type) + ")")
                }, match.has = createPropertyMatcher(function (actual, property) {
                    if ("object" == typeof actual) return property in actual;
                    else return void 0 !== actual[property]
                }, "has"), match.hasOwn = createPropertyMatcher(function (actual, property) {
                    return actual.hasOwnProperty(property)
                }, "hasOwn"), match.bool = match.typeOf("boolean"), match.number = match.typeOf("number"), match.string = match.typeOf("string"), match.object = match.typeOf("object"), match.func = match.typeOf("function"), match.array = match.typeOf("array"), match.regexp = match.typeOf("regexp"), match.date = match.typeOf("date"), commonJSModule) module.exports = match;
                else sinon.match = match
            }
        }("object" == typeof sinon && sinon || null), function (sinon) {
            function spy(object, property) {
                if (!property && "function" == typeof object) return spy.create(object);
                if (!object && !property) return spy.create(function () {});
                var method = object[property];
                return sinon.wrapMethod(object, property, spy.create(method))
            }
            var commonJSModule = "object" == typeof module && "function" == typeof require,
                spyCall, callId = 0,
                push = [].push,
                slice = Array.prototype.slice;
            if (!sinon && commonJSModule) sinon = require("../sinon");
            if (sinon)
                if (sinon.extend(spy, function () {
                    function delegateToCalls(api, method, matchAny, actual, notCalled) {
                        api[method] = function () {
                            if (!this.called)
                                if (notCalled) return notCalled.apply(this, arguments);
                                else return !1;
                            for (var currentCall, matches = 0, i = 0, l = this.callCount; l > i; i += 1)
                                if (currentCall = this.getCall(i), currentCall[actual || method].apply(currentCall, arguments))
                                    if (matches += 1, matchAny) return !0;
                            return matches === this.callCount
                        }
                    }

                    function matchingFake(fakes, args, strict) {
                        if (fakes)
                            for (var alen = args.length, i = 0, l = fakes.length; l > i; i++)
                                if (fakes[i].matches(args, strict)) return fakes[i]
                    }

                    function incrementCallCount() {
                        this.called = !0, this.callCount += 1, this.notCalled = !1, this.calledOnce = 1 == this.callCount, this.calledTwice = 2 == this.callCount, this.calledThrice = 3 == this.callCount
                    }

                    function createCallProperties() {
                        this.firstCall = this.getCall(0), this.secondCall = this.getCall(1), this.thirdCall = this.getCall(2), this.lastCall = this.getCall(this.callCount - 1)
                    }

                    function createProxy(func) {
                        if (func.length) return eval("(function proxy(" + vars.substring(0, 2 * func.length - 1) + ") { return proxy.invoke(func, this, slice.call(arguments)); })");
                        else return function proxy() {
                            return proxy.invoke(func, this, slice.call(arguments))
                        }
                    }
                    var vars = "a,b,c,d,e,f,g,h,i,j,k,l",
                        uuid = 0,
                        spyApi = {
                            reset: function () {
                                if (this.called = !1, this.notCalled = !0, this.calledOnce = !1, this.calledTwice = !1, this.calledThrice = !1, this.callCount = 0, this.firstCall = null, this.secondCall = null, this.thirdCall = null, this.lastCall = null, this.args = [], this.returnValues = [], this.thisValues = [], this.exceptions = [], this.callIds = [], this.fakes)
                                    for (var i = 0; i < this.fakes.length; i++) this.fakes[i].reset()
                            },
                            create: function create(func) {
                                var name;
                                if ("function" != typeof func) func = function () {};
                                else name = sinon.functionName(func);
                                var proxy = createProxy(func);
                                return sinon.extend(proxy, spy), delete proxy.create, sinon.extend(proxy, func), proxy.reset(), proxy.prototype = func.prototype, proxy.displayName = name || "spy", proxy.toString = sinon.functionToString, proxy._create = sinon.spy.create, proxy.id = "spy#" + uuid++, proxy
                            },
                            invoke: function invoke(func, thisValue, args) {
                                var matching = matchingFake(this.fakes, args),
                                    exception, returnValue;
                                incrementCallCount.call(this), push.call(this.thisValues, thisValue), push.call(this.args, args), push.call(this.callIds, callId++);
                                try {
                                    if (matching) returnValue = matching.invoke(func, thisValue, args);
                                    else returnValue = (this.func || func).apply(thisValue, args)
                                } catch (e) {
                                    throw push.call(this.returnValues, void 0), exception = e, e
                                } finally {
                                    push.call(this.exceptions, exception)
                                }
                                return push.call(this.returnValues, returnValue), createCallProperties.call(this), returnValue
                            },
                            getCall: function getCall(i) {
                                if (0 > i || i >= this.callCount) return null;
                                else return spyCall.create(this, this.thisValues[i], this.args[i], this.returnValues[i], this.exceptions[i], this.callIds[i])
                            },
                            calledBefore: function calledBefore(spyFn) {
                                if (!this.called) return !1;
                                if (!spyFn.called) return !0;
                                else return this.callIds[0] < spyFn.callIds[spyFn.callIds.length - 1]
                            },
                            calledAfter: function calledAfter(spyFn) {
                                if (!this.called || !spyFn.called) return !1;
                                else return this.callIds[this.callCount - 1] > spyFn.callIds[spyFn.callCount - 1]
                            },
                            withArgs: function () {
                                var args = slice.call(arguments);
                                if (this.fakes) {
                                    var match = matchingFake(this.fakes, args, !0);
                                    if (match) return match
                                } else this.fakes = [];
                                var original = this,
                                    fake = this._create();
                                fake.matchingAguments = args, push.call(this.fakes, fake), fake.withArgs = function () {
                                    return original.withArgs.apply(original, arguments)
                                };
                                for (var i = 0; i < this.args.length; i++)
                                    if (fake.matches(this.args[i])) incrementCallCount.call(fake), push.call(fake.thisValues, this.thisValues[i]), push.call(fake.args, this.args[i]), push.call(fake.returnValues, this.returnValues[i]), push.call(fake.exceptions, this.exceptions[i]), push.call(fake.callIds, this.callIds[i]);
                                return createCallProperties.call(fake), fake
                            },
                            matches: function (args, strict) {
                                var margs = this.matchingAguments;
                                if (margs.length <= args.length && sinon.deepEqual(margs, args.slice(0, margs.length))) return !strict || margs.length == args.length;
                                else return void 0
                            },
                            printf: function (format) {
                                var spy = this,
                                    args = slice.call(arguments, 1),
                                    formatter;
                                return (format || "").replace(/%(.)/g, function (match, specifyer) {
                                    if (formatter = spyApi.formatters[specifyer], "function" == typeof formatter) return formatter.call(null, spy, args);
                                    else if (!isNaN(parseInt(specifyer), 10)) return sinon.format(args[specifyer - 1]);
                                    return "%" + specifyer
                                })
                            }
                        };
                    return delegateToCalls(spyApi, "calledOn", !0), delegateToCalls(spyApi, "alwaysCalledOn", !1, "calledOn"), delegateToCalls(spyApi, "calledWith", !0), delegateToCalls(spyApi, "calledWithMatch", !0), delegateToCalls(spyApi, "alwaysCalledWith", !1, "calledWith"), delegateToCalls(spyApi, "alwaysCalledWithMatch", !1, "calledWithMatch"), delegateToCalls(spyApi, "calledWithExactly", !0), delegateToCalls(spyApi, "alwaysCalledWithExactly", !1, "calledWithExactly"), delegateToCalls(spyApi, "neverCalledWith", !1, "notCalledWith", function () {
                        return !0
                    }), delegateToCalls(spyApi, "neverCalledWithMatch", !1, "notCalledWithMatch", function () {
                        return !0
                    }), delegateToCalls(spyApi, "threw", !0), delegateToCalls(spyApi, "alwaysThrew", !1, "threw"), delegateToCalls(spyApi, "returned", !0), delegateToCalls(spyApi, "alwaysReturned", !1, "returned"), delegateToCalls(spyApi, "calledWithNew", !0), delegateToCalls(spyApi, "alwaysCalledWithNew", !1, "calledWithNew"), delegateToCalls(spyApi, "callArg", !1, "callArgWith", function () {
                        throw new Error(this.toString() + " cannot call arg since it was not yet invoked.")
                    }), spyApi.callArgWith = spyApi.callArg, delegateToCalls(spyApi, "yield", !1, "yield", function () {
                        throw new Error(this.toString() + " cannot yield since it was not yet invoked.")
                    }), spyApi.invokeCallback = spyApi.yield, delegateToCalls(spyApi, "yieldTo", !1, "yieldTo", function (property) {
                        throw new Error(this.toString() + " cannot yield to '" + property + "' since it was not yet invoked.")
                    }), spyApi.formatters = {
                        c: function (spy) {
                            return sinon.timesInWords(spy.callCount)
                        },
                        n: function (spy) {
                            return spy.toString()
                        },
                        C: function (spy) {
                            for (var calls = [], i = 0, l = spy.callCount; l > i; ++i) push.call(calls, "    " + spy.getCall(i).toString());
                            return calls.length > 0 ? "\n" + calls.join("\n") : ""
                        },
                        t: function (spy) {
                            for (var objects = [], i = 0, l = spy.callCount; l > i; ++i) push.call(objects, sinon.format(spy.thisValues[i]));
                            return objects.join(", ")
                        },
                        "*": function (spy, args) {
                            for (var formatted = [], i = 0, l = args.length; l > i; ++i) push.call(formatted, sinon.format(args[i]));
                            return formatted.join(", ")
                        }
                    }, spyApi
                }()), spyCall = function () {
                    function throwYieldError(proxy, text, args) {
                        var msg = sinon.functionName(proxy) + text;
                        if (args.length) msg += " Received [" + slice.call(args).join(", ") + "]";
                        throw new Error(msg)
                    }
                    var callApi = {
                        create: function create(spy, thisValue, args, returnValue, exception, id) {
                            var proxyCall = sinon.create(spyCall);
                            return delete proxyCall.create, proxyCall.proxy = spy, proxyCall.thisValue = thisValue, proxyCall.args = args, proxyCall.returnValue = returnValue, proxyCall.exception = exception, proxyCall.callId = "number" == typeof id && id || callId++, proxyCall
                        },
                        calledOn: function calledOn(thisValue) {
                            if (sinon.match && sinon.match.isMatcher(thisValue)) return thisValue.test(this.thisValue);
                            else return this.thisValue === thisValue
                        },
                        calledWith: function calledWith() {
                            for (var i = 0, l = arguments.length; l > i; i += 1)
                                if (!sinon.deepEqual(arguments[i], this.args[i])) return !1;
                            return !0
                        },
                        calledWithMatch: function calledWithMatch() {
                            for (var i = 0, l = arguments.length; l > i; i += 1) {
                                var actual = this.args[i],
                                    expectation = arguments[i];
                                if (!sinon.match || !sinon.match(expectation).test(actual)) return !1
                            }
                            return !0
                        },
                        calledWithExactly: function calledWithExactly() {
                            return arguments.length == this.args.length && this.calledWith.apply(this, arguments)
                        },
                        notCalledWith: function notCalledWith() {
                            return !this.calledWith.apply(this, arguments)
                        },
                        notCalledWithMatch: function notCalledWithMatch() {
                            return !this.calledWithMatch.apply(this, arguments)
                        },
                        returned: function returned(value) {
                            return sinon.deepEqual(value, this.returnValue)
                        },
                        threw: function threw(error) {
                            if ("undefined" == typeof error || !this.exception) return !!this.exception;
                            if ("string" == typeof error) return this.exception.name == error;
                            else return this.exception === error
                        },
                        calledWithNew: function calledWithNew(thisValue) {
                            return this.thisValue instanceof this.proxy
                        },
                        calledBefore: function (other) {
                            return this.callId < other.callId
                        },
                        calledAfter: function (other) {
                            return this.callId > other.callId
                        },
                        callArg: function (pos) {
                            this.args[pos]()
                        },
                        callArgWith: function (pos) {
                            var args = slice.call(arguments, 1);
                            this.args[pos].apply(null, args)
                        },
                        yield: function () {
                            for (var args = this.args, i = 0, l = args.length; l > i; ++i)
                                if ("function" == typeof args[i]) return args[i].apply(null, slice.call(arguments)), void 0;
                            throwYieldError(this.proxy, " cannot yield since no callback was passed.", args)
                        },
                        yieldTo: function (prop) {
                            for (var args = this.args, i = 0, l = args.length; l > i; ++i)
                                if (args[i] && "function" == typeof args[i][prop]) return args[i][prop].apply(null, slice.call(arguments, 1)), void 0;
                            throwYieldError(this.proxy, " cannot yield to '" + prop + "' since no callback was passed.", args)
                        },
                        toString: function () {
                            for (var callStr = this.proxy.toString() + "(", args = [], i = 0, l = this.args.length; l > i; ++i) push.call(args, sinon.format(this.args[i]));
                            if (callStr = callStr + args.join(", ") + ")", "undefined" != typeof this.returnValue) callStr += " => " + sinon.format(this.returnValue);
                            if (this.exception)
                                if (callStr += " !" + this.exception.name, this.exception.message) callStr += "(" + this.exception.message + ")";
                            return callStr
                        }
                    };
                    return callApi.invokeCallback = callApi.yield, callApi
                }(), spy.spyCall = spyCall, sinon.spyCall = spyCall, commonJSModule) module.exports = spy;
                else sinon.spy = spy
        }("object" == typeof sinon && sinon || null), function (sinon) {
            function stub(object, property, func) {
                if (func && "function" != typeof func) throw new TypeError("Custom stub should be function");
                var wrapper;
                if (func) wrapper = sinon.spy && sinon.spy.create ? sinon.spy.create(func) : func;
                else wrapper = stub.create(); if (!object && !property) return sinon.stub.create();
                if (!property && object && "object" == typeof object) {
                    for (var prop in object)
                        if ("function" == typeof object[prop]) stub(object, prop);
                    return object
                }
                return sinon.wrapMethod(object, property, wrapper)
            }

            function getChangingValue(stub, property) {
                var index = stub.callCount - 1,
                    prop = index in stub[property] ? stub[property][index] : stub[property + "Last"];
                return stub[property + "Last"] = prop, prop
            }

            function getCallback(stub, args) {
                var callArgAt = getChangingValue(stub, "callArgAts");
                if (0 > callArgAt) {
                    for (var callArgProp = getChangingValue(stub, "callArgProps"), i = 0, l = args.length; l > i; ++i) {
                        if (!callArgProp && "function" == typeof args[i]) return args[i];
                        if (callArgProp && args[i] && "function" == typeof args[i][callArgProp]) return args[i][callArgProp]
                    }
                    return null
                }
                return args[callArgAt]
            }

            function getCallbackError(stub, func, args) {
                if (stub.callArgAtsLast < 0) {
                    var msg;
                    if (stub.callArgPropsLast) msg = sinon.functionName(stub) + " expected to yield to '" + stub.callArgPropsLast + "', but no object with such a property was passed.";
                    else msg = sinon.functionName(stub) + " expected to yield, but no callback was passed."; if (args.length > 0) msg += " Received [" + join.call(args, ", ") + "]";
                    return msg
                }
                return "argument at index " + stub.callArgAtsLast + " is not a function: " + func
            }

            function callCallback(stub, args) {
                if (stub.callArgAts.length > 0) {
                    var func = getCallback(stub, args);
                    if ("function" != typeof func) throw new TypeError(getCallbackError(stub, func, args));
                    var index = stub.callCount - 1,
                        callbackArguments = getChangingValue(stub, "callbackArguments"),
                        callbackContext = getChangingValue(stub, "callbackContexts");
                    if (stub.callbackAsync) nextTick(function () {
                        func.apply(callbackContext, callbackArguments)
                    });
                    else func.apply(callbackContext, callbackArguments)
                }
            }
            var commonJSModule = "object" == typeof module && "function" == typeof require;
            if (!sinon && commonJSModule) sinon = require("../sinon");
            if (sinon) {
                var join = Array.prototype.join,
                    nextTick = function () {
                        if ("object" == typeof process && "function" == typeof process.nextTick) return process.nextTick;
                        else if ("function" == typeof msSetImmediate) return msSetImmediate.bind(window);
                        else if ("function" == typeof setImmediate) return setImmediate;
                        else return function (callback) {
                            setTimeout(callback, 0)
                        }
                    }(),
                    uuid = 0;
                if (sinon.extend(stub, function () {
                    function throwsException(error, message) {
                        if ("string" == typeof error) this.exception = new Error(message || ""), this.exception.name = error;
                        else if (!error) this.exception = new Error("Error");
                        else this.exception = error;
                        return this
                    }
                    var slice = Array.prototype.slice,
                        proto;
                    proto = {
                        create: function create() {
                            var functionStub = function () {
                                if (callCallback(functionStub, arguments), functionStub.exception) throw functionStub.exception;
                                else if ("number" == typeof functionStub.returnArgAt) return arguments[functionStub.returnArgAt];
                                else if (functionStub.returnThis) return this;
                                return functionStub.returnValue
                            };
                            functionStub.id = "stub#" + uuid++;
                            var orig = functionStub;
                            return functionStub = sinon.spy.create(functionStub), functionStub.func = orig, functionStub.callArgAts = [], functionStub.callbackArguments = [], functionStub.callbackContexts = [], functionStub.callArgProps = [], sinon.extend(functionStub, stub), functionStub._create = sinon.stub.create, functionStub.displayName = "stub", functionStub.toString = sinon.functionToString, functionStub
                        },
                        returns: function returns(value) {
                            return this.returnValue = value, this
                        },
                        returnsArg: function returnsArg(pos) {
                            if ("number" != typeof pos) throw new TypeError("argument index is not number");
                            return this.returnArgAt = pos, this
                        },
                        returnsThis: function returnsThis() {
                            return this.returnThis = !0, this
                        },
                        "throws": throwsException,
                        throwsException: throwsException,
                        callsArg: function callsArg(pos) {
                            if ("number" != typeof pos) throw new TypeError("argument index is not number");
                            return this.callArgAts.push(pos), this.callbackArguments.push([]), this.callbackContexts.push(void 0), this.callArgProps.push(void 0), this
                        },
                        callsArgOn: function callsArgOn(pos, context) {
                            if ("number" != typeof pos) throw new TypeError("argument index is not number");
                            if ("object" != typeof context) throw new TypeError("argument context is not an object");
                            return this.callArgAts.push(pos), this.callbackArguments.push([]), this.callbackContexts.push(context), this.callArgProps.push(void 0), this
                        },
                        callsArgWith: function callsArgWith(pos) {
                            if ("number" != typeof pos) throw new TypeError("argument index is not number");
                            return this.callArgAts.push(pos), this.callbackArguments.push(slice.call(arguments, 1)), this.callbackContexts.push(void 0), this.callArgProps.push(void 0), this
                        },
                        callsArgOnWith: function callsArgWith(pos, context) {
                            if ("number" != typeof pos) throw new TypeError("argument index is not number");
                            if ("object" != typeof context) throw new TypeError("argument context is not an object");
                            return this.callArgAts.push(pos), this.callbackArguments.push(slice.call(arguments, 2)), this.callbackContexts.push(context), this.callArgProps.push(void 0), this
                        },
                        yields: function () {
                            return this.callArgAts.push(-1), this.callbackArguments.push(slice.call(arguments, 0)), this.callbackContexts.push(void 0), this.callArgProps.push(void 0), this
                        },
                        yieldsOn: function (context) {
                            if ("object" != typeof context) throw new TypeError("argument context is not an object");
                            return this.callArgAts.push(-1), this.callbackArguments.push(slice.call(arguments, 1)), this.callbackContexts.push(context), this.callArgProps.push(void 0), this
                        },
                        yieldsTo: function (prop) {
                            return this.callArgAts.push(-1), this.callbackArguments.push(slice.call(arguments, 1)), this.callbackContexts.push(void 0), this.callArgProps.push(prop), this
                        },
                        yieldsToOn: function (prop, context) {
                            if ("object" != typeof context) throw new TypeError("argument context is not an object");
                            return this.callArgAts.push(-1), this.callbackArguments.push(slice.call(arguments, 2)), this.callbackContexts.push(context), this.callArgProps.push(prop), this
                        }
                    };
                    for (var method in proto)
                        if (proto.hasOwnProperty(method) && method.match(/^(callsArg|yields|thenYields$)/) && !method.match(/Async/)) proto[method + "Async"] = function (syncFnName) {
                            return function () {
                                return this.callbackAsync = !0, this[syncFnName].apply(this, arguments)
                            }
                        }(method);
                    return proto
                }()), commonJSModule) module.exports = stub;
                else sinon.stub = stub
            }
        }("object" == typeof sinon && sinon || null), function (sinon) {
            function mock(object) {
                if (!object) return sinon.expectation.create("Anonymous mock");
                else return mock.create(object)
            }
            var commonJSModule = "object" == typeof module && "function" == typeof require,
                push = [].push;
            if (!sinon && commonJSModule) sinon = require("../sinon");
            if (sinon) {
                sinon.mock = mock, sinon.extend(mock, function () {
                    function each(collection, callback) {
                        if (collection)
                            for (var i = 0, l = collection.length; l > i; i += 1) callback(collection[i])
                    }
                    return {
                        create: function create(object) {
                            if (!object) throw new TypeError("object is null");
                            var mockObject = sinon.extend({}, mock);
                            return mockObject.object = object, delete mockObject.create, mockObject
                        },
                        expects: function expects(method) {
                            if (!method) throw new TypeError("method is falsy");
                            if (!this.expectations) this.expectations = {}, this.proxies = [];
                            if (!this.expectations[method]) {
                                this.expectations[method] = [];
                                var mockObject = this;
                                sinon.wrapMethod(this.object, method, function () {
                                    return mockObject.invokeMethod(method, this, arguments)
                                }), push.call(this.proxies, method)
                            }
                            var expectation = sinon.expectation.create(method);
                            return push.call(this.expectations[method], expectation), expectation
                        },
                        restore: function restore() {
                            var object = this.object;
                            each(this.proxies, function (proxy) {
                                if ("function" == typeof object[proxy].restore) object[proxy].restore()
                            })
                        },
                        verify: function verify() {
                            var expectations = this.expectations || {}, messages = [],
                                met = [];
                            if (each(this.proxies, function (proxy) {
                                each(expectations[proxy], function (expectation) {
                                    if (!expectation.met()) push.call(messages, expectation.toString());
                                    else push.call(met, expectation.toString())
                                })
                            }), this.restore(), messages.length > 0) sinon.expectation.fail(messages.concat(met).join("\n"));
                            else sinon.expectation.pass(messages.concat(met).join("\n"));
                            return !0
                        },
                        invokeMethod: function invokeMethod(method, thisValue, args) {
                            var expectations = this.expectations && this.expectations[method],
                                length = expectations && expectations.length || 0,
                                i;
                            for (i = 0; length > i; i += 1)
                                if (!expectations[i].met() && expectations[i].allowsCall(thisValue, args)) return expectations[i].apply(thisValue, args);
                            var messages = [],
                                available, exhausted = 0;
                            for (i = 0; length > i; i += 1) {
                                if (expectations[i].allowsCall(thisValue, args)) available = available || expectations[i];
                                else exhausted += 1;
                                push.call(messages, "    " + expectations[i].toString())
                            }
                            if (0 === exhausted) return available.apply(thisValue, args);
                            else return messages.unshift("Unexpected call: " + sinon.spyCall.toString.call({
                                proxy: method,
                                args: args
                            })), sinon.expectation.fail(messages.join("\n")), void 0
                        }
                    }
                }());
                var times = sinon.timesInWords;
                if (sinon.expectation = function () {
                    function callCountInWords(callCount) {
                        if (0 == callCount) return "never called";
                        else return "called " + times(callCount)
                    }

                    function expectedCallCountInWords(expectation) {
                        var min = expectation.minCalls,
                            max = expectation.maxCalls;
                        if ("number" == typeof min && "number" == typeof max) {
                            var str = times(min);
                            if (min != max) str = "at least " + str + " and at most " + times(max);
                            return str
                        }
                        if ("number" == typeof min) return "at least " + times(min);
                        else return "at most " + times(max)
                    }

                    function receivedMinCalls(expectation) {
                        var hasMinLimit = "number" == typeof expectation.minCalls;
                        return !hasMinLimit || expectation.callCount >= expectation.minCalls
                    }

                    function receivedMaxCalls(expectation) {
                        if ("number" != typeof expectation.maxCalls) return !1;
                        else return expectation.callCount == expectation.maxCalls
                    }
                    var slice = Array.prototype.slice,
                        _invoke = sinon.spy.invoke;
                    return {
                        minCalls: 1,
                        maxCalls: 1,
                        create: function create(methodName) {
                            var expectation = sinon.extend(sinon.stub.create(), sinon.expectation);
                            return delete expectation.create, expectation.method = methodName, expectation
                        },
                        invoke: function invoke(func, thisValue, args) {
                            return this.verifyCallAllowed(thisValue, args), _invoke.apply(this, arguments)
                        },
                        atLeast: function atLeast(num) {
                            if ("number" != typeof num) throw new TypeError("'" + num + "' is not number");
                            if (!this.limitsSet) this.maxCalls = null, this.limitsSet = !0;
                            return this.minCalls = num, this
                        },
                        atMost: function atMost(num) {
                            if ("number" != typeof num) throw new TypeError("'" + num + "' is not number");
                            if (!this.limitsSet) this.minCalls = null, this.limitsSet = !0;
                            return this.maxCalls = num, this
                        },
                        never: function never() {
                            return this.exactly(0)
                        },
                        once: function once() {
                            return this.exactly(1)
                        },
                        twice: function twice() {
                            return this.exactly(2)
                        },
                        thrice: function thrice() {
                            return this.exactly(3)
                        },
                        exactly: function exactly(num) {
                            if ("number" != typeof num) throw new TypeError("'" + num + "' is not a number");
                            return this.atLeast(num), this.atMost(num)
                        },
                        met: function met() {
                            return !this.failed && receivedMinCalls(this)
                        },
                        verifyCallAllowed: function verifyCallAllowed(thisValue, args) {
                            if (receivedMaxCalls(this)) this.failed = !0, sinon.expectation.fail(this.method + " already called " + times(this.maxCalls));
                            if ("expectedThis" in this && this.expectedThis !== thisValue) sinon.expectation.fail(this.method + " called with " + thisValue + " as thisValue, expected " + this.expectedThis);
                            if ("expectedArguments" in this) {
                                if (!args) sinon.expectation.fail(this.method + " received no arguments, expected " + this.expectedArguments.join());
                                if (args.length < this.expectedArguments.length) sinon.expectation.fail(this.method + " received too few arguments (" + args.join() + "), expected " + this.expectedArguments.join());
                                if (this.expectsExactArgCount && args.length != this.expectedArguments.length) sinon.expectation.fail(this.method + " received too many arguments (" + args.join() + "), expected " + this.expectedArguments.join());
                                for (var i = 0, l = this.expectedArguments.length; l > i; i += 1)
                                    if (!sinon.deepEqual(this.expectedArguments[i], args[i])) sinon.expectation.fail(this.method + " received wrong arguments (" + args.join() + "), expected " + this.expectedArguments.join())
                            }
                        },
                        allowsCall: function allowsCall(thisValue, args) {
                            if (this.met() && receivedMaxCalls(this)) return !1;
                            if ("expectedThis" in this && this.expectedThis !== thisValue) return !1;
                            if (!("expectedArguments" in this)) return !0;
                            if (args = args || [], args.length < this.expectedArguments.length) return !1;
                            if (this.expectsExactArgCount && args.length != this.expectedArguments.length) return !1;
                            for (var i = 0, l = this.expectedArguments.length; l > i; i += 1)
                                if (!sinon.deepEqual(this.expectedArguments[i], args[i])) return !1;
                            return !0
                        },
                        withArgs: function withArgs() {
                            return this.expectedArguments = slice.call(arguments), this
                        },
                        withExactArgs: function withExactArgs() {
                            return this.withArgs.apply(this, arguments), this.expectsExactArgCount = !0, this
                        },
                        on: function on(thisValue) {
                            return this.expectedThis = thisValue, this
                        },
                        toString: function () {
                            var args = (this.expectedArguments || []).slice();
                            if (!this.expectsExactArgCount) push.call(args, "[...]");
                            var callStr = sinon.spyCall.toString.call({
                                proxy: this.method,
                                args: args
                            }),
                                message = callStr.replace(", [...", "[, ...") + " " + expectedCallCountInWords(this);
                            if (this.met()) return "Expectation met: " + message;
                            else return "Expected " + message + " (" + callCountInWords(this.callCount) + ")"
                        },
                        verify: function verify() {
                            if (!this.met()) sinon.expectation.fail(this.toString());
                            else sinon.expectation.pass(this.toString());
                            return !0
                        },
                        pass: function (message) {
                            sinon.assert.pass(message)
                        },
                        fail: function (message) {
                            var exception = new Error(message);
                            throw exception.name = "ExpectationError", exception
                        }
                    }
                }(), commonJSModule) module.exports = mock;
                else sinon.mock = mock
            }
        }("object" == typeof sinon && sinon || null), function (sinon) {
            function getFakes(fakeCollection) {
                if (!fakeCollection.fakes) fakeCollection.fakes = [];
                return fakeCollection.fakes
            }

            function each(fakeCollection, method) {
                for (var fakes = getFakes(fakeCollection), i = 0, l = fakes.length; l > i; i += 1)
                    if ("function" == typeof fakes[i][method]) fakes[i][method]()
            }

            function compact(fakeCollection) {
                for (var fakes = getFakes(fakeCollection), i = 0; i < fakes.length;) fakes.splice(i, 1)
            }
            var commonJSModule = "object" == typeof module && "function" == typeof require,
                push = [].push,
                hasOwnProperty = Object.prototype.hasOwnProperty;
            if (!sinon && commonJSModule) sinon = require("../sinon");
            if (sinon) {
                var collection = {
                    verify: function resolve() {
                        each(this, "verify")
                    },
                    restore: function restore() {
                        each(this, "restore"), compact(this)
                    },
                    verifyAndRestore: function verifyAndRestore() {
                        var exception;
                        try {
                            this.verify()
                        } catch (e) {
                            exception = e
                        }
                        if (this.restore(), exception) throw exception
                    },
                    add: function add(fake) {
                        return push.call(getFakes(this), fake), fake
                    },
                    spy: function spy() {
                        return this.add(sinon.spy.apply(sinon, arguments))
                    },
                    stub: function stub(object, property, value) {
                        if (property) {
                            var original = object[property];
                            if ("function" != typeof original) {
                                if (!hasOwnProperty.call(object, property)) throw new TypeError("Cannot stub non-existent own property " + property);
                                return object[property] = value, this.add({
                                    restore: function () {
                                        object[property] = original
                                    }
                                })
                            }
                        }
                        if (!property && object && "object" == typeof object) {
                            var stubbedObj = sinon.stub.apply(sinon, arguments);
                            for (var prop in stubbedObj)
                                if ("function" == typeof stubbedObj[prop]) this.add(stubbedObj[prop]);
                            return stubbedObj
                        }
                        return this.add(sinon.stub.apply(sinon, arguments))
                    },
                    mock: function mock() {
                        return this.add(sinon.mock.apply(sinon, arguments))
                    },
                    inject: function inject(obj) {
                        var col = this;
                        return obj.spy = function () {
                            return col.spy.apply(col, arguments)
                        }, obj.stub = function () {
                            return col.stub.apply(col, arguments)
                        }, obj.mock = function () {
                            return col.mock.apply(col, arguments)
                        }, obj
                    }
                };
                if (commonJSModule) module.exports = collection;
                else sinon.collection = collection
            }
        }("object" == typeof sinon && sinon || null), "undefined" == typeof sinon) var sinon = {};
        if (function (global) {
            function addTimer(args, recurring) {
                if (0 === args.length) throw new Error("Function requires at least 1 parameter");
                var toId = id++,
                    delay = args[1] || 0;
                if (!this.timeouts) this.timeouts = {};
                if (this.timeouts[toId] = {
                    id: toId,
                    func: args[0],
                    callAt: this.now + delay,
                    invokeArgs: Array.prototype.slice.call(args, 2)
                }, recurring === !0) this.timeouts[toId].interval = delay;
                return toId
            }

            function parseTime(str) {
                if (!str) return 0;
                var strings = str.split(":"),
                    l = strings.length,
                    i = l,
                    ms = 0,
                    parsed;
                if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) throw new Error("tick only understands numbers and 'h:m:s'");
                for (; i--;) {
                    if (parsed = parseInt(strings[i], 10), parsed >= 60) throw new Error("Invalid time " + str);
                    ms += parsed * Math.pow(60, l - i - 1)
                }
                return 1e3 * ms
            }

            function createObject(object) {
                var newObject;
                if (Object.create) newObject = Object.create(object);
                else {
                    var F = function () {};
                    F.prototype = object, newObject = new F
                }
                return newObject.Date.clock = newObject, newObject
            }

            function mirrorDateProperties(target, source) {
                if (source.now) target.now = function now() {
                    return target.clock.now
                };
                else delete target.now; if (source.toSource) target.toSource = function toSource() {
                    return source.toSource()
                };
                else delete target.toSource;
                return target.toString = function toString() {
                    return source.toString()
                }, target.prototype = source.prototype, target.parse = source.parse, target.UTC = source.UTC, target.prototype.toUTCString = source.prototype.toUTCString, target
            }

            function restore() {
                for (var method, i = 0, l = this.methods.length; l > i; i++)
                    if (method = this.methods[i], global[method].hadOwnProperty) global[method] = this["_" + method];
                    else delete global[method];
                this.methods = []
            }

            function stubGlobal(method, clock) {
                if (clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(global, method), clock["_" + method] = global[method], "Date" == method) {
                    var date = mirrorDateProperties(clock[method], global[method]);
                    global[method] = date
                } else {
                    global[method] = function () {
                        return clock[method].apply(clock, arguments)
                    };
                    for (var prop in clock[method])
                        if (clock[method].hasOwnProperty(prop)) global[method][prop] = clock[method][prop]
                }
                global[method].clock = clock
            }
            var id = 1;
            sinon.clock = {
                now: 0,
                create: function create(now) {
                    var clock = createObject(this);
                    if ("number" == typeof now) clock.now = now;
                    if (now && "object" == typeof now) throw new TypeError("now should be milliseconds since UNIX epoch");
                    return clock
                },
                setTimeout: function setTimeout(callback, timeout) {
                    return addTimer.call(this, arguments, !1)
                },
                clearTimeout: function clearTimeout(timerId) {
                    if (!this.timeouts) this.timeouts = [];
                    if (timerId in this.timeouts) delete this.timeouts[timerId]
                },
                setInterval: function setInterval(callback, timeout) {
                    return addTimer.call(this, arguments, !0)
                },
                clearInterval: function clearInterval(timerId) {
                    this.clearTimeout(timerId)
                },
                tick: function tick(ms) {
                    ms = "number" == typeof ms ? ms : parseTime(ms);
                    for (var tickFrom = this.now, tickTo = this.now + ms, previous = this.now, timer = this.firstTimerInRange(tickFrom, tickTo), firstException; timer && tickTo >= tickFrom;) {
                        if (this.timeouts[timer.id]) {
                            tickFrom = this.now = timer.callAt;
                            try {
                                this.callTimer(timer)
                            } catch (e) {
                                firstException = firstException || e
                            }
                        }
                        timer = this.firstTimerInRange(previous, tickTo), previous = tickFrom
                    }
                    if (this.now = tickTo, firstException) throw firstException
                },
                firstTimerInRange: function (from, to) {
                    var timer, smallest, originalTimer;
                    for (var id in this.timeouts)
                        if (this.timeouts.hasOwnProperty(id)) {
                            if (this.timeouts[id].callAt < from || this.timeouts[id].callAt > to) continue;
                            if (!smallest || this.timeouts[id].callAt < smallest) originalTimer = this.timeouts[id], smallest = this.timeouts[id].callAt, timer = {
                                func: this.timeouts[id].func,
                                callAt: this.timeouts[id].callAt,
                                interval: this.timeouts[id].interval,
                                id: this.timeouts[id].id,
                                invokeArgs: this.timeouts[id].invokeArgs
                            }
                        }
                    return timer || null
                },
                callTimer: function (timer) {
                    if ("number" == typeof timer.interval) this.timeouts[timer.id].callAt += timer.interval;
                    else delete this.timeouts[timer.id];
                    try {
                        if ("function" == typeof timer.func) timer.func.apply(null, timer.invokeArgs);
                        else eval(timer.func)
                    } catch (e) {
                        var exception = e
                    }
                    if (this.timeouts[timer.id]) {
                        if (exception) throw exception
                    } else if (exception) throw exception
                },
                reset: function reset() {
                    this.timeouts = {}
                },
                Date: function () {
                    function ClockDate(year, month, date, hour, minute, second, ms) {
                        switch (arguments.length) {
                        case 0:
                            return new NativeDate(ClockDate.clock.now);
                        case 1:
                            return new NativeDate(year);
                        case 2:
                            return new NativeDate(year, month);
                        case 3:
                            return new NativeDate(year, month, date);
                        case 4:
                            return new NativeDate(year, month, date, hour);
                        case 5:
                            return new NativeDate(year, month, date, hour, minute);
                        case 6:
                            return new NativeDate(year, month, date, hour, minute, second);
                        default:
                            return new NativeDate(year, month, date, hour, minute, second, ms)
                        }
                    }
                    var NativeDate = Date;
                    return mirrorDateProperties(ClockDate, NativeDate)
                }()
            };
            var methods = ["Date", "setTimeout", "setInterval", "clearTimeout", "clearInterval"];
            sinon.useFakeTimers = function useFakeTimers(now) {
                var clock = sinon.clock.create(now);
                if (clock.restore = restore, clock.methods = Array.prototype.slice.call(arguments, "number" == typeof now ? 1 : 0), 0 === clock.methods.length) clock.methods = methods;
                for (var i = 0, l = clock.methods.length; l > i; i++) stubGlobal(clock.methods[i], clock);
                return clock
            }
        }("undefined" != typeof global && "function" != typeof global ? global : this), sinon.timers = {
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
            setInterval: setInterval,
            clearInterval: clearInterval,
            Date: Date
        }, "object" == typeof module && "function" == typeof require) module.exports = sinon;
        if ("undefined" == typeof sinon) this.sinon = {};
        if (function () {
            var push = [].push;
            sinon.Event = function Event(type, bubbles, cancelable) {
                this.initEvent(type, bubbles, cancelable)
            }, sinon.Event.prototype = {
                initEvent: function (type, bubbles, cancelable) {
                    this.type = type, this.bubbles = bubbles, this.cancelable = cancelable
                },
                stopPropagation: function () {},
                preventDefault: function () {
                    this.defaultPrevented = !0
                }
            }, sinon.EventTarget = {
                addEventListener: function addEventListener(event, listener, useCapture) {
                    this.eventListeners = this.eventListeners || {}, this.eventListeners[event] = this.eventListeners[event] || [], push.call(this.eventListeners[event], listener)
                },
                removeEventListener: function removeEventListener(event, listener, useCapture) {
                    for (var listeners = this.eventListeners && this.eventListeners[event] || [], i = 0, l = listeners.length; l > i; ++i)
                        if (listeners[i] == listener) return listeners.splice(i, 1)
                },
                dispatchEvent: function dispatchEvent(event) {
                    for (var type = event.type, listeners = this.eventListeners && this.eventListeners[type] || [], i = 0; i < listeners.length; i++)
                        if ("function" == typeof listeners[i]) listeners[i].call(this, event);
                        else listeners[i].handleEvent(event);
                    return !!event.defaultPrevented
                }
            }
        }(), "undefined" == typeof sinon) this.sinon = {};
        if (sinon.xhr = {
            XMLHttpRequest: this.XMLHttpRequest
        }, function (global) {
            function FakeXMLHttpRequest() {
                if (this.readyState = FakeXMLHttpRequest.UNSENT, this.requestHeaders = {}, this.requestBody = null, this.status = 0, this.statusText = "", "function" == typeof FakeXMLHttpRequest.onCreate) FakeXMLHttpRequest.onCreate(this)
            }

            function verifyState(xhr) {
                if (xhr.readyState !== FakeXMLHttpRequest.OPENED) throw new Error("INVALID_STATE_ERR");
                if (xhr.sendFlag) throw new Error("INVALID_STATE_ERR")
            }

            function each(collection, callback) {
                if (collection)
                    for (var i = 0, l = collection.length; l > i; i += 1) callback(collection[i])
            }

            function some(collection, callback) {
                for (var index = 0; index < collection.length; index++)
                    if (callback(collection[index]) === !0) return !0;
                return !1
            }

            function verifyRequestSent(xhr) {
                if (xhr.readyState == FakeXMLHttpRequest.DONE) throw new Error("Request done")
            }

            function verifyHeadersReceived(xhr) {
                if (xhr.async && xhr.readyState != FakeXMLHttpRequest.HEADERS_RECEIVED) throw new Error("No headers received")
            }

            function verifyResponseBodyType(body) {
                if ("string" != typeof body) {
                    var error = new Error("Attempted to respond to fake XMLHttpRequest with " + body + ", which is not a string.");
                    throw error.name = "InvalidBodyException", error
                }
            }
            var xhr = sinon.xhr;
            xhr.GlobalXMLHttpRequest = global.XMLHttpRequest, xhr.GlobalActiveXObject = global.ActiveXObject, xhr.supportsActiveX = "undefined" != typeof xhr.GlobalActiveXObject, xhr.supportsXHR = "undefined" != typeof xhr.GlobalXMLHttpRequest, xhr.workingXHR = xhr.supportsXHR ? xhr.GlobalXMLHttpRequest : xhr.supportsActiveX ? function () {
                return new xhr.GlobalActiveXObject("MSXML2.XMLHTTP.3.0")
            } : !1;
            var unsafeHeaders = {
                "Accept-Charset": !0,
                "Accept-Encoding": !0,
                Connection: !0,
                "Content-Length": !0,
                Cookie: !0,
                Cookie2: !0,
                "Content-Transfer-Encoding": !0,
                Date: !0,
                Expect: !0,
                Host: !0,
                "Keep-Alive": !0,
                Referer: !0,
                TE: !0,
                Trailer: !0,
                "Transfer-Encoding": !0,
                Upgrade: !0,
                "User-Agent": !0,
                Via: !0
            }, apply = function (obj, method, args) {
                    switch (args.length) {
                    case 0:
                        return obj[method]();
                    case 1:
                        return obj[method](args[0]);
                    case 2:
                        return obj[method](args[0], args[1]);
                    case 3:
                        return obj[method](args[0], args[1], args[2]);
                    case 4:
                        return obj[method](args[0], args[1], args[2], args[3]);
                    case 5:
                        return obj[method](args[0], args[1], args[2], args[3], args[4])
                    }
                };
            FakeXMLHttpRequest.filters = [], FakeXMLHttpRequest.addFilter = function (fn) {
                this.filters.push(fn)
            };
            var IE6Re = /MSIE 6/;
            FakeXMLHttpRequest.defake = function (fakeXhr, xhrArgs) {
                var xhr = new sinon.xhr.workingXHR;
                each(["open", "setRequestHeader", "send", "abort", "getResponseHeader", "getAllResponseHeaders", "addEventListener", "overrideMimeType", "removeEventListener"], function (method) {
                    fakeXhr[method] = function () {
                        return apply(xhr, method, arguments)
                    }
                });
                var copyAttrs = function (args) {
                    each(args, function (attr) {
                        try {
                            fakeXhr[attr] = xhr[attr]
                        } catch (e) {
                            if (!IE6Re.test(navigator.userAgent)) throw e
                        }
                    })
                }, stateChange = function () {
                        if (fakeXhr.readyState = xhr.readyState, xhr.readyState >= FakeXMLHttpRequest.HEADERS_RECEIVED) copyAttrs(["status", "statusText"]);
                        if (xhr.readyState >= FakeXMLHttpRequest.LOADING) copyAttrs(["responseText"]);
                        if (xhr.readyState === FakeXMLHttpRequest.DONE) copyAttrs(["responseXML"]);
                        if (fakeXhr.onreadystatechange) fakeXhr.onreadystatechange.call(fakeXhr)
                    };
                if (xhr.addEventListener) {
                    for (var event in fakeXhr.eventListeners)
                        if (fakeXhr.eventListeners.hasOwnProperty(event)) each(fakeXhr.eventListeners[event], function (handler) {
                            xhr.addEventListener(event, handler)
                        });
                    xhr.addEventListener("readystatechange", stateChange)
                } else xhr.onreadystatechange = stateChange;
                apply(xhr, "open", xhrArgs)
            }, FakeXMLHttpRequest.useFilters = !1, sinon.extend(FakeXMLHttpRequest.prototype, sinon.EventTarget, {
                async: !0,
                open: function open(method, url, async, username, password) {
                    if (this.method = method, this.url = url, this.async = "boolean" == typeof async ? async : !0, this.username = username, this.password = password, this.responseText = null, this.responseXML = null, this.requestHeaders = {}, this.sendFlag = !1, sinon.FakeXMLHttpRequest.useFilters === !0) {
                        var xhrArgs = arguments,
                            defake = some(FakeXMLHttpRequest.filters, function (filter) {
                                return filter.apply(this, xhrArgs)
                            });
                        if (defake) return sinon.FakeXMLHttpRequest.defake(this, arguments)
                    }
                    this.readyStateChange(FakeXMLHttpRequest.OPENED)
                },
                readyStateChange: function readyStateChange(state) {
                    if (this.readyState = state, "function" == typeof this.onreadystatechange) try {
                        this.onreadystatechange()
                    } catch (e) {
                        sinon.logError("Fake XHR onreadystatechange handler", e)
                    }
                    this.dispatchEvent(new sinon.Event("readystatechange"))
                },
                setRequestHeader: function setRequestHeader(header, value) {
                    if (verifyState(this), unsafeHeaders[header] || /^(Sec-|Proxy-)/.test(header)) throw new Error('Refused to set unsafe header "' + header + '"');
                    if (this.requestHeaders[header]) this.requestHeaders[header] += "," + value;
                    else this.requestHeaders[header] = value
                },
                setResponseHeaders: function setResponseHeaders(headers) {
                    this.responseHeaders = {};
                    for (var header in headers)
                        if (headers.hasOwnProperty(header)) this.responseHeaders[header] = headers[header];
                    if (this.async) this.readyStateChange(FakeXMLHttpRequest.HEADERS_RECEIVED)
                },
                send: function send(data) {
                    if (verifyState(this), !/^(get|head)$/i.test(this.method)) {
                        if (this.requestHeaders["Content-Type"]) {
                            var value = this.requestHeaders["Content-Type"].split(";");
                            this.requestHeaders["Content-Type"] = value[0] + ";charset=utf-8"
                        } else this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";
                        this.requestBody = data
                    }
                    if (this.errorFlag = !1, this.sendFlag = this.async, this.readyStateChange(FakeXMLHttpRequest.OPENED), "function" == typeof this.onSend) this.onSend(this)
                },
                abort: function abort() {
                    if (this.aborted = !0, this.responseText = null, this.errorFlag = !0, this.requestHeaders = {}, this.readyState > sinon.FakeXMLHttpRequest.UNSENT && this.sendFlag) this.readyStateChange(sinon.FakeXMLHttpRequest.DONE), this.sendFlag = !1;
                    this.readyState = sinon.FakeXMLHttpRequest.UNSENT
                },
                getResponseHeader: function getResponseHeader(header) {
                    if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) return null;
                    if (/^Set-Cookie2?$/i.test(header)) return null;
                    header = header.toLowerCase();
                    for (var h in this.responseHeaders)
                        if (h.toLowerCase() == header) return this.responseHeaders[h];
                    return null
                },
                getAllResponseHeaders: function getAllResponseHeaders() {
                    if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) return "";
                    var headers = "";
                    for (var header in this.responseHeaders)
                        if (this.responseHeaders.hasOwnProperty(header) && !/^Set-Cookie2?$/i.test(header)) headers += header + ": " + this.responseHeaders[header] + "\r\n";
                    return headers
                },
                setResponseBody: function setResponseBody(body) {
                    verifyRequestSent(this), verifyHeadersReceived(this), verifyResponseBodyType(body);
                    var chunkSize = this.chunkSize || 10,
                        index = 0;
                    this.responseText = "";
                    do {
                        if (this.async) this.readyStateChange(FakeXMLHttpRequest.LOADING);
                        this.responseText += body.substring(index, index + chunkSize), index += chunkSize
                    } while (index < body.length);
                    var type = this.getResponseHeader("Content-Type");
                    if (this.responseText && (!type || /(text\/xml)|(application\/xml)|(\+xml)/.test(type))) try {
                        this.responseXML = FakeXMLHttpRequest.parseXML(this.responseText)
                    } catch (e) {}
                    if (this.async) this.readyStateChange(FakeXMLHttpRequest.DONE);
                    else this.readyState = FakeXMLHttpRequest.DONE
                },
                respond: function respond(status, headers, body) {
                    this.setResponseHeaders(headers || {}), this.status = "number" == typeof status ? status : 200, this.statusText = FakeXMLHttpRequest.statusCodes[this.status], this.setResponseBody(body || "")
                }
            }), sinon.extend(FakeXMLHttpRequest, {
                UNSENT: 0,
                OPENED: 1,
                HEADERS_RECEIVED: 2,
                LOADING: 3,
                DONE: 4
            }), FakeXMLHttpRequest.parseXML = function parseXML(text) {
                var xmlDoc;
                if ("undefined" != typeof DOMParser) {
                    var parser = new DOMParser;
                    xmlDoc = parser.parseFromString(text, "text/xml")
                } else xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), xmlDoc.async = "false", xmlDoc.loadXML(text);
                return xmlDoc
            }, FakeXMLHttpRequest.statusCodes = {
                100: "Continue",
                101: "Switching Protocols",
                200: "OK",
                201: "Created",
                202: "Accepted",
                203: "Non-Authoritative Information",
                204: "No Content",
                205: "Reset Content",
                206: "Partial Content",
                300: "Multiple Choice",
                301: "Moved Permanently",
                302: "Found",
                303: "See Other",
                304: "Not Modified",
                305: "Use Proxy",
                307: "Temporary Redirect",
                400: "Bad Request",
                401: "Unauthorized",
                402: "Payment Required",
                403: "Forbidden",
                404: "Not Found",
                405: "Method Not Allowed",
                406: "Not Acceptable",
                407: "Proxy Authentication Required",
                408: "Request Timeout",
                409: "Conflict",
                410: "Gone",
                411: "Length Required",
                412: "Precondition Failed",
                413: "Request Entity Too Large",
                414: "Request-URI Too Long",
                415: "Unsupported Media Type",
                416: "Requested Range Not Satisfiable",
                417: "Expectation Failed",
                422: "Unprocessable Entity",
                500: "Internal Server Error",
                501: "Not Implemented",
                502: "Bad Gateway",
                503: "Service Unavailable",
                504: "Gateway Timeout",
                505: "HTTP Version Not Supported"
            }, sinon.useFakeXMLHttpRequest = function () {
                if (sinon.FakeXMLHttpRequest.restore = function restore(keepOnCreate) {
                    if (xhr.supportsXHR) global.XMLHttpRequest = xhr.GlobalXMLHttpRequest;
                    if (xhr.supportsActiveX) global.ActiveXObject = xhr.GlobalActiveXObject;
                    if (delete sinon.FakeXMLHttpRequest.restore, keepOnCreate !== !0) delete sinon.FakeXMLHttpRequest.onCreate
                }, xhr.supportsXHR) global.XMLHttpRequest = sinon.FakeXMLHttpRequest;
                if (xhr.supportsActiveX) global.ActiveXObject = function ActiveXObject(objId) {
                    if ("Microsoft.XMLHTTP" == objId || /^Msxml2\.XMLHTTP/i.test(objId)) return new sinon.FakeXMLHttpRequest;
                    else return new xhr.GlobalActiveXObject(objId)
                };
                return sinon.FakeXMLHttpRequest
            }, sinon.FakeXMLHttpRequest = FakeXMLHttpRequest
        }(this), "object" == typeof module && "function" == typeof require) module.exports = sinon;
        if ("undefined" == typeof sinon) var sinon = {};
        if (sinon.fakeServer = function () {
            function F() {}

            function create(proto) {
                return F.prototype = proto, new F
            }

            function responseArray(handler) {
                var response = handler;
                if ("[object Array]" != Object.prototype.toString.call(handler)) response = [200, {},
                    handler
                ];
                if ("string" != typeof response[2]);
                return response
            }

            function matchOne(response, reqMethod, reqUrl) {
                var rmeth = response.method,
                    matchMethod = !rmeth || rmeth.toLowerCase() == reqMethod.toLowerCase(),
                    url = response.url,
                    matchUrl = !url || url == reqUrl || "function" == typeof url.test && url.test(reqUrl);
                return matchMethod && matchUrl
            }

            function match(response, request) {
                var requestMethod = this.getHTTPMethod(request),
                    requestUrl = request.url;
                if (!/^https?:\/\//.test(requestUrl) || rCurrLoc.test(requestUrl)) requestUrl = requestUrl.replace(rCurrLoc, "");
                if (matchOne(response, this.getHTTPMethod(request), requestUrl)) {
                    if ("function" == typeof response.response) {
                        var ru = response.url,
                            args = [request].concat(!ru ? [] : requestUrl.match(ru).slice(1));
                        return response.response.apply(response, args)
                    }
                    return !0
                }
                return !1
            }
            var push = [].push,
                wloc = "undefined" != typeof window ? window.location : {}, rCurrLoc = new RegExp("^" + wloc.protocol + "//" + wloc.host);
            return {
                create: function () {
                    var server = create(this);
                    return this.xhr = sinon.useFakeXMLHttpRequest(), server.requests = [], this.xhr.onCreate = function (xhrObj) {
                        server.addRequest(xhrObj)
                    }, server
                },
                addRequest: function addRequest(xhrObj) {
                    var server = this;
                    if (push.call(this.requests, xhrObj), xhrObj.onSend = function () {
                        server.handleRequest(this)
                    }, this.autoRespond && !this.responding) setTimeout(function () {
                        server.responding = !1, server.respond()
                    }, this.autoRespondAfter || 10), this.responding = !0
                },
                getHTTPMethod: function getHTTPMethod(request) {
                    if (this.fakeHTTPMethods && /post/i.test(request.method)) {
                        var matches = (request.requestBody || "").match(/_method=([^\b;]+)/);
                        return matches ? matches[1] : request.method
                    }
                    return request.method
                },
                handleRequest: function handleRequest(xhr) {
                    if (xhr.async) {
                        if (!this.queue) this.queue = [];
                        push.call(this.queue, xhr)
                    } else this.processRequest(xhr)
                },
                respondWith: function respondWith(method, url, body) {
                    if (1 == arguments.length && "function" != typeof method) return this.response = responseArray(method), void 0;
                    if (!this.responses) this.responses = [];
                    if (1 == arguments.length) body = method, url = method = null;
                    if (2 == arguments.length) body = url, url = method, method = null;
                    push.call(this.responses, {
                        method: method,
                        url: url,
                        response: "function" == typeof body ? body : responseArray(body)
                    })
                },
                respond: function respond() {
                    if (arguments.length > 0) this.respondWith.apply(this, arguments);
                    for (var queue = this.queue || [], request; request = queue.shift();) this.processRequest(request)
                },
                processRequest: function processRequest(request) {
                    try {
                        if (request.aborted) return;
                        var response = this.response || [404, {}, ""];
                        if (this.responses)
                            for (var i = this.responses.length - 1; i >= 0; i--)
                                if (match.call(this, this.responses[i], request)) {
                                    response = this.responses[i].response;
                                    break
                                }
                        if (4 != request.readyState) request.respond(response[0], response[1], response[2])
                    } catch (e) {
                        sinon.logError("Fake server request processing", e)
                    }
                },
                restore: function restore() {
                    return this.xhr.restore && this.xhr.restore.apply(this.xhr, arguments)
                }
            }
        }(), "object" == typeof module && "function" == typeof require) module.exports = sinon;
        if (function () {
            function Server() {}
            Server.prototype = sinon.fakeServer, sinon.fakeServerWithClock = new Server, sinon.fakeServerWithClock.addRequest = function addRequest(xhr) {
                if (xhr.async) {
                    if ("object" == typeof setTimeout.clock) this.clock = setTimeout.clock;
                    else this.clock = sinon.useFakeTimers(), this.resetClock = !0; if (!this.longestTimeout) {
                        var clockSetTimeout = this.clock.setTimeout,
                            clockSetInterval = this.clock.setInterval,
                            server = this;
                        this.clock.setTimeout = function (fn, timeout) {
                            return server.longestTimeout = Math.max(timeout, server.longestTimeout || 0), clockSetTimeout.apply(this, arguments)
                        }, this.clock.setInterval = function (fn, timeout) {
                            return server.longestTimeout = Math.max(timeout, server.longestTimeout || 0), clockSetInterval.apply(this, arguments)
                        }
                    }
                }
                return sinon.fakeServer.addRequest.call(this, xhr)
            }, sinon.fakeServerWithClock.respond = function respond() {
                var returnVal = sinon.fakeServer.respond.apply(this, arguments);
                if (this.clock)
                    if (this.clock.tick(this.longestTimeout || 0), this.longestTimeout = 0, this.resetClock) this.clock.restore(), this.resetClock = !1;
                return returnVal
            }, sinon.fakeServerWithClock.restore = function restore() {
                if (this.clock) this.clock.restore();
                return sinon.fakeServer.restore.apply(this, arguments)
            }
        }(), "object" == typeof module && "function" == typeof require) {
            var sinon = require("../sinon");
            sinon.extend(sinon, require("./util/fake_timers"))
        }
        return function () {
            function exposeValue(sandbox, config, key, value) {
                if (value)
                    if (config.injectInto) config.injectInto[key] = value;
                    else push.call(sandbox.args, value)
            }

            function prepareSandboxFromConfig(config) {
                var sandbox = sinon.create(sinon.sandbox);
                if (config.useFakeServer) {
                    if ("object" == typeof config.useFakeServer) sandbox.serverPrototype = config.useFakeServer;
                    sandbox.useFakeServer()
                }
                if (config.useFakeTimers)
                    if ("object" == typeof config.useFakeTimers) sandbox.useFakeTimers.apply(sandbox, config.useFakeTimers);
                    else sandbox.useFakeTimers();
                return sandbox
            }
            var push = [].push;
            if (sinon.sandbox = sinon.extend(sinon.create(sinon.collection), {
                useFakeTimers: function useFakeTimers() {
                    return this.clock = sinon.useFakeTimers.apply(sinon, arguments), this.add(this.clock)
                },
                serverPrototype: sinon.fakeServer,
                useFakeServer: function useFakeServer() {
                    var proto = this.serverPrototype || sinon.fakeServer;
                    if (!proto || !proto.create) return null;
                    else return this.server = proto.create(), this.add(this.server)
                },
                inject: function (obj) {
                    if (sinon.collection.inject.call(this, obj), this.clock) obj.clock = this.clock;
                    if (this.server) obj.server = this.server, obj.requests = this.server.requests;
                    return obj
                },
                create: function (config) {
                    if (!config) return sinon.create(sinon.sandbox);
                    var sandbox = prepareSandboxFromConfig(config);
                    sandbox.args = sandbox.args || [];
                    var prop, value, exposed = sandbox.inject({});
                    if (config.properties)
                        for (var i = 0, l = config.properties.length; l > i; i++) prop = config.properties[i], value = exposed[prop] || "sandbox" == prop && sandbox, exposeValue(sandbox, config, prop, value);
                    else exposeValue(sandbox, config, "sandbox", value);
                    return sandbox
                }
            }), sinon.sandbox.useFakeXMLHttpRequest = sinon.sandbox.useFakeServer, "object" == typeof module && "function" == typeof require) module.exports = sinon.sandbox
        }(),
        function (sinon) {
            function test(callback) {
                var type = typeof callback;
                if ("function" != type) throw new TypeError("sinon.test needs to wrap a test function, got " + type);
                return function () {
                    var config = sinon.getConfig(sinon.config);
                    config.injectInto = config.injectIntoThis && this || config.injectInto;
                    var sandbox = sinon.sandbox.create(config),
                        exception, result, args = Array.prototype.slice.call(arguments).concat(sandbox.args);
                    try {
                        result = callback.apply(this, args)
                    } catch (e) {
                        exception = e
                    }
                    if ("undefined" != typeof exception) throw sandbox.restore(), exception;
                    else sandbox.verifyAndRestore();
                    return result
                }
            }
            var commonJSModule = "object" == typeof module && "function" == typeof require;
            if (!sinon && commonJSModule) sinon = require("../sinon");
            if (sinon)
                if (test.config = {
                    injectIntoThis: !0,
                    injectInto: null,
                    properties: ["spy", "stub", "mock", "clock", "server", "requests"],
                    useFakeTimers: !0,
                    useFakeServer: !0
                }, commonJSModule) module.exports = test;
                else sinon.test = test
        }("object" == typeof sinon && sinon || null),
        function (sinon) {
            function createTest(property, setUp, tearDown) {
                return function () {
                    if (setUp) setUp.apply(this, arguments);
                    var exception, result;
                    try {
                        result = property.apply(this, arguments)
                    } catch (e) {
                        exception = e
                    }
                    if (tearDown) tearDown.apply(this, arguments);
                    if (exception) throw exception;
                    return result
                }
            }

            function testCase(tests, prefix) {
                if (!tests || "object" != typeof tests) throw new TypeError("sinon.testCase needs an object with test functions");
                prefix = prefix || "test";
                var rPrefix = new RegExp("^" + prefix),
                    methods = {}, testName, property, method, setUp = tests.setUp,
                    tearDown = tests.tearDown;
                for (testName in tests)
                    if (tests.hasOwnProperty(testName)) {
                        if (property = tests[testName], /^(setUp|tearDown)$/.test(testName)) continue;
                        if ("function" == typeof property && rPrefix.test(testName)) {
                            if (method = property, setUp || tearDown) method = createTest(property, setUp, tearDown);
                            methods[testName] = sinon.test(method)
                        } else methods[testName] = tests[testName]
                    }
                return methods
            }
            var commonJSModule = "object" == typeof module && "function" == typeof require;
            if (!sinon && commonJSModule) sinon = require("../sinon");
            if (sinon && Object.prototype.hasOwnProperty)
                if (commonJSModule) module.exports = testCase;
                else sinon.testCase = testCase
        }("object" == typeof sinon && sinon || null),
        function (sinon, global) {
            function verifyIsStub() {
                for (var method, i = 0, l = arguments.length; l > i; ++i) {
                    if (method = arguments[i], !method) assert.fail("fake is not a spy");
                    if ("function" != typeof method) assert.fail(method + " is not a function");
                    if ("function" != typeof method.getCall) assert.fail(method + " is not stubbed")
                }
            }

            function failAssertion(object, msg) {
                object = object || global;
                var failMethod = object.fail || assert.fail;
                failMethod.call(object, msg)
            }

            function mirrorPropAsAssertion(name, method, message) {
                if (2 == arguments.length) message = method, method = name;
                assert[name] = function (fake) {
                    verifyIsStub(fake);
                    var args = slice.call(arguments, 1),
                        failed = !1;
                    if ("function" == typeof method) failed = !method(fake);
                    else failed = "function" == typeof fake[method] ? !fake[method].apply(fake, args) : !fake[method]; if (failed) failAssertion(this, fake.printf.apply(fake, [message].concat(args)));
                    else assert.pass(name)
                }
            }

            function exposedName(prefix, prop) {
                return !prefix || /^fail/.test(prop) ? prop : prefix + prop.slice(0, 1).toUpperCase() + prop.slice(1)
            }
            var commonJSModule = "object" == typeof module && "function" == typeof require,
                slice = Array.prototype.slice,
                assert;
            if (!sinon && commonJSModule) sinon = require("../sinon");
            if (sinon)
                if (assert = {
                    failException: "AssertError",
                    fail: function fail(message) {
                        var error = new Error(message);
                        throw error.name = this.failException || assert.failException, error
                    },
                    pass: function pass(assertion) {},
                    callOrder: function assertCallOrder() {
                        verifyIsStub.apply(null, arguments);
                        var expected = "",
                            actual = "";
                        if (!sinon.calledInOrder(arguments)) {
                            try {
                                expected = [].join.call(arguments, ", "), actual = sinon.orderByFirstCall(slice.call(arguments)).join(", ")
                            } catch (e) {}
                            failAssertion(this, "expected " + expected + " to be " + "called in order but were called as " + actual)
                        } else assert.pass("callOrder")
                    },
                    callCount: function assertCallCount(method, count) {
                        if (verifyIsStub(method), method.callCount != count) {
                            var msg = "expected %n to be called " + sinon.timesInWords(count) + " but was called %c%C";
                            failAssertion(this, method.printf(msg))
                        } else assert.pass("callCount")
                    },
                    expose: function expose(target, options) {
                        if (!target) throw new TypeError("target is null or undefined");
                        var o = options || {}, prefix = "undefined" == typeof o.prefix && "assert" || o.prefix,
                            includeFail = "undefined" == typeof o.includeFail || !! o.includeFail;
                        for (var method in this)
                            if ("export" != method && (includeFail || !/^(fail)/.test(method))) target[exposedName(prefix, method)] = this[method];
                        return target
                    }
                }, mirrorPropAsAssertion("called", "expected %n to have been called at least once but was never called"), mirrorPropAsAssertion("notCalled", function (spy) {
                    return !spy.called
                }, "expected %n to not have been called but was called %c%C"), mirrorPropAsAssertion("calledOnce", "expected %n to be called once but was called %c%C"), mirrorPropAsAssertion("calledTwice", "expected %n to be called twice but was called %c%C"), mirrorPropAsAssertion("calledThrice", "expected %n to be called thrice but was called %c%C"), mirrorPropAsAssertion("calledOn", "expected %n to be called with %1 as this but was called with %t"), mirrorPropAsAssertion("alwaysCalledOn", "expected %n to always be called with %1 as this but was called with %t"), mirrorPropAsAssertion("calledWithNew", "expected %n to be called with new"), mirrorPropAsAssertion("alwaysCalledWithNew", "expected %n to always be called with new"), mirrorPropAsAssertion("calledWith", "expected %n to be called with arguments %*%C"), mirrorPropAsAssertion("calledWithMatch", "expected %n to be called with match %*%C"), mirrorPropAsAssertion("alwaysCalledWith", "expected %n to always be called with arguments %*%C"), mirrorPropAsAssertion("alwaysCalledWithMatch", "expected %n to always be called with match %*%C"), mirrorPropAsAssertion("calledWithExactly", "expected %n to be called with exact arguments %*%C"), mirrorPropAsAssertion("alwaysCalledWithExactly", "expected %n to always be called with exact arguments %*%C"), mirrorPropAsAssertion("neverCalledWith", "expected %n to never be called with arguments %*%C"), mirrorPropAsAssertion("neverCalledWithMatch", "expected %n to never be called with match %*%C"), mirrorPropAsAssertion("threw", "%n did not throw exception%C"), mirrorPropAsAssertion("alwaysThrew", "%n did not always throw exception%C"), commonJSModule) module.exports = assert;
                else sinon.assert = assert
        }("object" == typeof sinon && sinon || null, "undefined" != typeof window ? window : global), sinon
    }.call("undefined" != typeof window && window || {})
});