var inquirer = require('inquirer');

var createObjectScreen = function() {
  console.log("********************************");
  console.log("*         Create Object        *");
  console.log("********************************\n");
  console.log("We will now create an object which you can see in the 'Data Browser'.\n");
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
          explainObjectCreate();
          sayGoodbye();
        },
        failure: function(kiiObject, errorString) {
          console.log("Error saving object: " + errorString);
        }
      });
    }
  });
};

var notNull = function(input) {
  if (input.length == 0) {
    return false;
  }
  return true;
};

var explainLogin = function() {
  var code = "KiiUser.authenticate('username', 'password', {\n\
  success: function(kiiUser) {\n\
    //success\
  },\n\
  failure: function(kiiUser, errorString) {\n\
    console.log('Error signing up user. ' + errorString);\n\
  }\n\
});\n\
";
  console.log("\nThe following code shows how to perform a login with an existing user:\n");
  console.log(code);
  console.log("\nYou can find the user you just logged in as in the 'User Console'.\n");
};

var explainSignup = function() {
  var code = "var user = KiiUser.userWithUsername('username', 'password');\n\
user.register({\n\
  success: function(kiiUser) {\n\
    //success\
  },\n\
  failure: function(kiiUser, errorString) {\n\
    console.log('Error registering user. ' + errorString);\n\
  }\n\
});\n\
";
  console.log("\nThe following code shows how to perform signup with a new user:\n");
  console.log(code);
  console.log("\nYou can find the user you just created in the 'User Console'.\n");
};

var explainObjectCreate = function() {
  var code = "var appBucket = Kii.bucketWithName('myBucket');\n\
var obj = appBucket.createObject();\n\
obj.set('myObjectValue', true);\n\
obj.save({\n\
  success: function(kiiObject) {\n\
    //success\n\
  },\n\
  failure: function(kiiObject, errorString) {\n\
    console.log('Error saving object: ' + errorString);\n\
  }\n\
});";
  console.log("\nThe following code shows how to the object was created:\n");
  console.log(code);
  console.log("\nYou can find the object in the 'myBucket' bucket in application scope, with the attribute 'myObjectValue' and value of 'true'.\n");
};

var loginOrSignupScreen = function() {
  console.log("\n********************************");
  console.log("*       Sign Up or Login       *");
  console.log("********************************\n");
  console.log("To complete this tutorial you need to create or login with a Kii User.\n");
  console.log("This is not the same as your developer portal account.\n");

  var credentialsFields = [{
    type: "input",
    name: "username",
    message: "Username",
    validate: notNull,
  }, {
    type: "password",
    name: "password",
    message: "Password",
    validate: notNull,
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
            explainLogin();
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
            explainSignup();
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
