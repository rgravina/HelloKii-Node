# Hello Kii for node.js

This simple app shows you how to create a user, login, and create an object in a bucket.

## Installation

### From the developer portal
If downloaded from the developer portal, the app id, key and site for the 'Kii Tutorial' app will be entered in the file `lib/modules/init.js`. 

### From the Github repository
To run directly from this repository, please replace these values in `lib/modules/init.js`:

From:
```javascript
Kii.initializeWithSite(
  "__KII_APP_ID__",
  "__KII_APP_KEY__",
  __KII_APP_SITE__
);
```
To:
```javascript
Kii.initializeWithSite(
  "<app id>",
  "<app key>",
  KiiSite.US
);
```

## Running

To run without installing via `npm`, run:
```
node bin/hello-kii.js
```
