(function() {
    let root = this;
    
    let flatten = function(data) {
        let result = {};
        function recurse (cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                 for(let i=0, l=cur.length; i<l; i++)
                     recurse(cur[i], prop + "[" + i + "]");
                if (l == 0)
                    result[prop] = [];
            } else {
                let isEmpty = true;
                for (let p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop+"."+p : p);
                }
                if (isEmpty && prop)
                    result[prop] = {};
            }
        }
        recurse(data, "");
        
        return result;
    };
    
    let isDebug = function() {
        return (window.location.hostname.indexOf("localhost") != -1);
    };
    
    let uuidv4 = function() {
        if ('randomUUID' in crypto) {
            return crypto.randomUUID();
        }
    
        return function() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          );
        }
    };
    
    let lookUpDeviceUUID = function() {
        let deviceUUIDKey = "uuid.device.syncmedia.io";
    
        let deviceUUID = localStorage.getItem(deviceUUIDKey);
        if (!!deviceUUID) {
            return deviceUUID;
        }
    
        deviceUUID = uuidv4();
        try {
            localStorage.setItem(deviceUUIDKey, deviceUUID);
        } catch {
            //no-op
        }
    
        return deviceUUID;
    }
    
    let searchToObject = function(query) {
        let obj = {};
    
        if (query === "") {
            return obj;
        }
        
        let pairs = query.split("&");
    
        for (let i in pairs ) {
            if ( pairs[i] === "" ) { continue }
              
            let pair = pairs[i].split("=");
    
            if (pair.length === 1 || pair[1] === "") {
                obj[ decodeURIComponent( pair[0] ) ] = true;
            } else {
                obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
            }
        }
    
        return obj;
    };
    
    let mylog = (function () {
        let logs = ['log', 'warn', 'error', 'assert'];

        if (window.location.hostname == "localhost") {
            logs.push('debug');
        }

        logs.forEach(function(item) {
            root[item] = function() {
                let args = Array.prototype.slice.call(arguments);
                console[item].apply(console, args);
            };
        });

        return root;
    }());

    

    let SMApp = function(obj) {
        if (obj instanceof SMApp)
            return obj;
        if (!(this instanceof SMApp))
            return new SMApp(obj);
        this._wrapped = obj;
    };
    
    let campaign = {
        user: "unknown",
        api_key: ""
    };

    let device = {
        host:       window.location.host,
        hostname:   window.location.hostname,
        pathname:   window.location.pathname,
        href:       window.location.href,
        referrer:   document.referrer,
        user_agent: navigator.userAgent,
        platform:   navigator?.platform || 'unknown',
        query:      searchToObject(window.location.search.substring(1)),
        id:         lookUpDeviceUUID(),
    };

    SMApp.setUser = function(user) {
        campaign.user = user;
    };

    SMApp.logEvent = async function(name, payload) {
        if (!!!campaign.api_key) {
            mylog.error("Please check the included js library path, `src` link is missing api_key.");
            return false;
        }

        let json = {
            campaign: campaign,
            device: device,
            event: {
                name: name,
                id: uuidv4(),
                timestamp: new Date().getTime(),
                payload: payload || {}
            }
        };

        json = flatten(json);

        const URL = (isDebug() ? "http://localhost:12000": "https://integrations.syncmedia.io") + "/v1.0/adlytics/js/events/capture";

        const response = await fetch(URL, {
            method: 'post',
            mode: "cors",
            referrer: "no-referrer",
            credentials: "omit",
            cache: "no-store",
            keepalive: false,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json)
        });
        return response.status == 200;
    };

    (function() {
        let endpoint = "sync_media_event_capture";

        let scripts = document.getElementsByTagName('script');
        let i;
        for (i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf(endpoint) != -1) {
                campaign = searchToObject( scripts[i].src.split('?')[1] );
                break;
            }
        }

        SMApp.logEvent("open");
    }());

    root.SMApp = SMApp;
}.call(this));
