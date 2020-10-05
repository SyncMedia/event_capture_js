const DEBUG = (window.location.hostname == "localhost");

window.onload = (event) => {
    console.log('The page has fully loaded');

};

let mylog = (function () {
    let root = {
        log: function() {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, args);
        },
        debug: function() {
            var args = Array.prototype.slice.call(arguments);
            console.debug.apply(console, args);
        },
        warn: function() {
            var args = Array.prototype.slice.call(arguments);
            console.warn.apply(console, args);
        },
        error: function() {
            var args = Array.prototype.slice.call(arguments);
            console.error.apply(console, args);
        }
    };

    let logs = ['log', 'warn', 'error', 'assert'];

    if (DEBUG) {
        logs.push('debug');
    }

    logs.forEach((item) => {
        root[item] = function() {
            var args = Array.prototype.slice.call(arguments);
            console[item].apply(console, args);
        };
    });

    return root;
}());

function log(type, ...args) {
    if (type == "debug" && !DEBUG) {
        return;
    }

    console[type].apply(Array.prototype.slice.call(args));
}

function load_config() {
    let config = {
        meta: {
            hostname:   window.location.hostname,
            pathname:   window.location.pathname,
            href:       window.location.href,
            referrer:   document.referrer,
            is_mobile:  (SmartPhone.isIOS() || SmartPhone.isAndroid() || SmartPhone.isWindowsMobile() || SmartPhone.isNexus() || false),
            user_agent: navigator.userAgent,
            platform:   navigator.platform
        }
    };

    let scripts = document.getElementsByTagName('script');
    var i;
    for (i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf("sm_capture.js") != -1) {
            let params = (scripts[i].src.split('?')[1] ?? "").split("&");
            params.forEach((param) => {
                let kv = param.split("=");
                config[kv[0]] = kv[1] ?? true;
            });
        }
    }

    if (!!!config.api_key) {
        mylog.error("Please check fix the included js library path, `src` link is missing api_key.");
    }

    geo_data().then((data) => {
        ['ip', 'city', 'region', 'country', 'loc', 'timezone'].forEach((item) => {
            config.meta[item] = data[item] ?? false;
        });
    });

    return config;
}


function geo_data() {
    let args = {
          method: "GET",
          mode: "cors", // same-origin, no-cors
          referrer: "no-referrer",
          credentials: "omit", // omit, include
          cache: "no-store", // no-store, reload, no-cache, force-cache, or only-if-cached
          keepalive: false, // true
    };

    return fetch('https://ipinfo.io/json?token=f6d5b4490ab073', args)
        .then((resp) => resp.json())
        .catch((error) => {});
}

(function() {
    var root = this;

    var SMApp = function(obj) {
        if (obj instanceof SMApp)
            return obj;
        if (!(this instanceof SMApp))
            return new SMApp(obj);
        this._wrapped = obj;
    };

    let config = load_config();


    let api = {};

    api.setUser = function(user) {
        config.user_id = user;
    };

    api.logEvent = function(key, payload) {
        let json = {index: key, payload: "", config: config};

        if (typeof(payload) == "object") {
            json.payload = JSON.stringify(payload);
        }
        else {
            json.payload = String(payload);
        }
    };

    SMApp.api = api;

    if (DEBUG) {
        SMApp.config = config;
    }

    root.SMApp = SMApp;

}.call(this));


/**
 *
 * @auther SM@K<smali.kazmi@hotmail.com>
 * @description website: smak.pk
 */

(function() {
    var root = this;

    var SmartPhone = function(obj) {
        if (obj instanceof SmartPhone)
            return obj;
        if (!(this instanceof SmartPhone))
            return new SmartPhone(obj);
        this._wrapped = obj;
    };

    SmartPhone.userAgent = null;
    SmartPhone.getUserAgent = function() {
        return this.userAgent;
    };

    SmartPhone.setUserAgent = function(userAgent) {
        this.userAgent = userAgent;
    };

    SmartPhone.isAndroid = function() {
        return this.getUserAgent().match(/Android/i);
    };

    SmartPhone.isBlackBerry = function() {
        return this.getUserAgent().match(/BlackBerry/i);
    };

    SmartPhone.isBlackBerryPlayBook = function() {
        return this.getUserAgent().match(/PlayBook/i);
    };

    SmartPhone.isBlackBerry10 = function() {
        return this.getUserAgent().match(/BB10/i);
    };

    SmartPhone.isIOS = function() {
        return this.isIPhone() || this.isIPad() || this.isIPod();
    };

    SmartPhone.isIPhone = function() {
        return this.getUserAgent().match(/iPhone/i);
    };

    SmartPhone.isIPad = function() {
        return this.getUserAgent().match(/iPad/i);
    };

    SmartPhone.isIPod = function() {
        return this.getUserAgent().match(/iPod/i);
    };

    SmartPhone.isOpera = function() {
        return this.getUserAgent().match(/Opera Mini/i);
    };

    SmartPhone.isWindows = function() {
        return this.isWindowsDesktop() || this.isWindowsMobile();
    };

    SmartPhone.isWindowsMobile = function() {
        return this.getUserAgent().match(/IEMobile/i);
    };

    SmartPhone.isWindowsDesktop = function() {
        return this.getUserAgent().match(/WPDesktop/i);
    };

    SmartPhone.isFireFox = function() {
        return this.getUserAgent().match(/Firefox/i);
    };

    SmartPhone.isNexus = function() {
        return this.getUserAgent().match(/Nexus/i);
    };

    SmartPhone.isKindleFire = function() {
        return this.getUserAgent().match(/Kindle Fire/i);
    };

    SmartPhone.isPalm = function() {
        return this.getUserAgent().match(/PalmSource|Palm/i);
    };

    SmartPhone.isAny = function() {
        var foundAny = false;
        var getAllMethods = Object.getOwnPropertyNames(SmartPhone).filter(function(property) {
            return typeof SmartPhone[property] == 'function';
        });

        for (var index in getAllMethods) {
            if (getAllMethods[index] === 'setUserAgent' || getAllMethods[index] === 'getUserAgent' ||
                    getAllMethods[index] === 'isAny' || getAllMethods[index] === 'isWindows' ||
                    getAllMethods[index] === 'isIOS') {
                continue;
            }
            if (SmartPhone[getAllMethods[index]]()) {
                foundAny = true;
                break;
            }
        }
        return foundAny;
    };

    if(typeof window === 'function' || typeof window === 'object') {
        SmartPhone.setUserAgent(navigator.userAgent);
    }

    if (typeof exports !== 'undefined') {

        var middleware = function(isMiddleware) {

            isMiddleware = isMiddleware === (void 0)  ? true : isMiddleware;

            if(isMiddleware) {
                return function(req, res, next) {

                    var userAgent = req.headers['user-agent'] || '';
                    SmartPhone.setUserAgent(userAgent);
                    req.SmartPhone = SmartPhone;

                    if ('function' === typeof res.locals) {
                        res.locals({SmartPhone: SmartPhone});
                    } else {
                        res.locals.SmartPhone = SmartPhone;
                    }

                    next();
                };
            } else {
                return SmartPhone;
            }

        };

        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = middleware;
        }
        exports = middleware;
    } else {
        root.SmartPhone = SmartPhone;
    }

}.call(this));
