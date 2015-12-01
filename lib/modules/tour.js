var inquirer = require('inquirer');

var createObjectScreen = function() {
  console.log("\n********************************");
  console.log("*         Create Object        *");
  console.log("********************************\n");
  inquirer.prompt([{
    type: "confirm",
    name: "continue",
    message: "Create Object?"
  }], function(answer) {
    if (answer.continue == true) {
      var appBucket = Kii.bucketWithName("myBucket");
      var obj = appBucket.createObject();
      obj.set("myObjectValue", true);
      obj.save({
        success: function(kiiObject) {
          sayGoodbye();
        },
        failure: function(kiiObject, errorString) {
          console.log("Error saving object: " + errorString);
        }
      });
    }
  });
};

var loginOrSignupScreen = function() {
  console.log("\n********************************");
  console.log("*       Sign Up or Login       *");
  console.log("********************************\n");
  console.log("To complete this tutorial you need to create or login with a Kii User.\n");
  console.log("This is not the same as your developer portal account.");

  var credentialsFields = [{
    type: "input",
    name: "username",
    message: "Username"
  }, {
    type: "password",
    name: "password",
    message: "Password"
  }];

  inquirer.prompt([{
    type: "list",
    name: "start",
    message: "Would you like to signup or login?",
    choices: ["Create new user", "Login with an existing user"],
  }], function(answer) {
    console.log("\nPlease enter credentials.");
    if (answer.start == "Login with an existing user") {
      inquirer.prompt(credentialsFields, function(credentials) {
        KiiUser.authenticate(credentials.username, credentials.password, {
          success: function(kiiUser) {
            createObjectScreen();
          },
          failure: function(kiiUser, errorString) {
            console.log("Error logging in user. " + errorString);
          }
        });
      });      
    } else {
      inquirer.prompt(credentialsFields, function(credentials) {
        var user = KiiUser.userWithUsername(credentials.username, credentials.password);
        user.register({
          success: function(kiiUser) {
            createObjectScreen();
          },
          failure: function(kiiUser, errorString) {
            console.log("Error registering user. " + errorString);
          }
        });
      });      
    }
  });  
};

var sayGoodbye = function() {
  console.log("\nTo learn more about the Kii SDK see http://docs.kii.com/.");  
};

module.exports = function () {
  console.log("********************************");
  console.log("*            HelloKii          *");
  console.log("********************************");
  console.log("\nThis application will give you a quick tour of some of Kii Cloud's basic features.\n")
  console.log("Data will be saved in the 'Kii Tutorial' app in your developer portal account.\n");
  console.log(" * Creating a user");
  console.log(" * Logging in with a user");
  console.log(" * Creating an object in an application scope bucket.\n");
  inquirer.prompt([{
    type: "confirm",
    name: "action",
    message: "Start Tutorial",
  }], function(answer) {
    if (answer.action == true) {
      loginOrSignupScreen();
    } else {
      sayGoodbye();
    }
  });
};
