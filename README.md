# About

Sync Browser library to track browser specific data

## How to use

Include below snippet in query. 

```
<script type="text/javascript" 
    src="https://cdn.jsdelivr.net/gh/SyncMedia/event_capture_js@v1.3.0/sync_media_event_capture.min.js?api_key=API_KEY" 
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

