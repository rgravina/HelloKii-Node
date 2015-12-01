# Hello Kii for node.js

This simple app shows you how to create a user, login, and create an object in a bucket.

## Installation

If downloaded from the developer portal, the app id, key and site for the 'Kii Tutorial' app will be entered in the file `lib/modules/init.js`. 

To run directly from this repository, please replace these values in `lib/modules/init.js`:

```
Kii.initializeWithSite(
  "__KII_APP_ID__",
  "__KII_APP_KEY__",
  "__KII_APP_SITE__"
);
```

## Running

To run without installing via `npm`, run:
```
node bin/hello-kii.js
```

To install as an `npm` package from this repository:
```
npm install -g .
./hello-kii
```
