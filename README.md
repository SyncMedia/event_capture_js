# About

Sync Browser library to track browser specific data

## How to use

Include below snippet in query. 

Get Latest version from below. `sm_capture_vx.x.min.js`

```
<script type="text/javascript" 
    src="https://storage.syncmedia.io/libs/sm_capture_vx.x.min.js?api_key=API_KEY" 
    charset="utf-8" 
    crossorigin="anonymous">
</script>
```

### Track User Events

```
SMApp.setUser("user_id");
```

### Log Custom Event

```
let event_json = {
    "key": "val",
    "dict":{
        "bool": true,
        "string": "str",
        "arr": ["arr"]
    }
};

SMApp.logEvent("ExampleEventName", event_json);
```

## Contributors

* Pankaj Soni <pankajsoni19@syncmedia.io>

## Current Release

* [sm\_capture\_v1.2.min.js](https://storage.syncmedia.io/libs/sm_capture_v1.2.min.js)

## Previous Releases

* [sm\_capture\_v1.2.min.js](https://storage.syncmedia.io/libs/sm_capture_v1.2.min.js)
