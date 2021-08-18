/*
* https://github.com/uuidjs/uuid
* uuidv4-8.1.0.min.js
*/

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).uuidv4=e()}(this,(function(){"use strict";var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),e=new Uint8Array(16);function n(){if(!t)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(e)}for(var o=[],r=0;r<256;++r)o.push((r+256).toString(16).substr(1));return function(t,e,r){"string"==typeof t&&(e="binary"===t?new Uint8Array(16):null,t=null);var u=(t=t||{}).random||(t.rng||n)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,e){for(var i=r||0,d=0;d<16;++d)e[i+d]=u[d];return e}return function(t,e){var n=e||0,r=o;return(r[t[n+0]]+r[t[n+1]]+r[t[n+2]]+r[t[n+3]]+"-"+r[t[n+4]]+r[t[n+5]]+"-"+r[t[n+6]]+r[t[n+7]]+"-"+r[t[n+8]]+r[t[n+9]]+"-"+r[t[n+10]]+r[t[n+11]]+r[t[n+12]]+r[t[n+13]]+r[t[n+14]]+r[t[n+15]]).toLowerCase()}(u)}}));

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

(function() {
    var root = this;

    var SMApp = function(obj) {
        if (obj instanceof SMApp)
            return obj;
        if (!(this instanceof SMApp))
            return new SMApp(obj);
        this._wrapped = obj;
    };

    let mylog = (function () {
        // let root = {
        //     log: function() {
        //         var args = Array.prototype.slice.call(arguments);
        //         console.log.apply(console, args);
        //     },
        //     debug: function() {
        //         var args = Array.prototype.slice.call(arguments);
        //         console.debug.apply(console, args);
        //     },
        //     warn: function() {
        //         var args = Array.prototype.slice.call(arguments);
        //         console.warn.apply(console, args);
        //     },
        //     error: function() {
        //         var args = Array.prototype.slice.call(arguments);
        //         console.error.apply(console, args);
        //     }
        // };

        let logs = ['log', 'warn', 'error', 'assert'];

        if (window.location.hostname == "localhost") {
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

    let config = {
        user: "unknown",
        api_key: false,
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

    let validate_api_key = (api_key) => {
        if (!!!config.api_key) {
            mylog.error("Please check fix the included js library path, `src` link is missing api_key.");
            return false;
        }

        return true;
    };

    SMApp.setUser = function(user) {
        config.user = user;
    };

    SMApp.logEvent = function(key, payload) {
        if (!validate_api_key()) {
            return;
        }

        let json = {
            index: key,
            payload: "",
            config: config,
            timestamp: new Date().getTime(),
            event_id: uuidv4()
        };

        if (!!payload) {
            if (typeof(payload) == "object") {
                json.payload = JSON.stringify(payload);
            }
            else {
                json.payload = String(payload);
            }
        }

//         mylog.debug("event: " + key, json);

        const URL = "https://integrations.syncmedia.io/v1.0/adlytics/js/events/capture";

        return fetch(URL, {
            method: 'post',
            mode: "cors", // same-origin, no-cors
            referrer: "no-referrer",
            credentials: "omit",
            cache: "no-store",
            keepalive: false, // omit, include
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json)
        }).then((response) => {
//             mylog.debug("event saved: ", json.event_id);
            return response.status == 200;
        });
    };

    (function() {
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

        if (!validate_api_key(config.api_key)) {
            return;
        }

        SMApp.logEvent("open");
    }());

    root.SMApp = SMApp;
}.call(this));
