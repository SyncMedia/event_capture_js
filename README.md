# About

Sync Browser library to track browser specific data

# How to use

Include below snippet in query

__Prod__

```
<script type="text/javascript" src="https://storage.syncmedia.io/libs/sm_capture_v1.0.js?api_key=API_KEY" charset="utf-8" crossorigin="anonymous"></script>
```

__Staging__

```
<script type="text/javascript" src="https://storage.syncmedia.io/libs/sm_capture_staging_v1.0.js?api_key=API_KEY" charset="utf-8" crossorigin="anonymous"></script>
```

### Log Custom Event

```
SMApp.logEvent(eventname, json);
SMApp.logEvent(eventname, string);
```

# Contributors

* Pankaj Soni <pankajsoni19@syncmedia.io>
