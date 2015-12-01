require("jquery-xhr");
var KiiSDK = require('../kii.js');
var root = KiiSDK.create();
["Kii", "KiiUser", "KiiSite"].map(function(e) { eval(e + " = root." + e) });

module.exports = function (options) {
  Kii.initializeWithSite(
    "__KII_APP_ID__",
    "__KII_APP_KEY__",
    "__KII_APP_SITE__"
  );
};