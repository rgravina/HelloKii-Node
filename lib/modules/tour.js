var inquirer = require('inquirer');

var credentialsQuestion = [{
  type: "input",
  name: "username",
  message: "Username"
}, {
  type: "password",
  name: "password",
  message: "Password"
}];

var createObjectScreen = function() {
  inquirer.prompt([{
    type: "confirm",
    name: "continue",
    message: "Continue to create object?"
  }], function(answer) {
    if (answer.contine == true) {
      var appBucket = Kii.bucketWithName("myBucket");
      var obj = appBucket.createObject();
      obj.set("myObjectValue", true);
      // Save the object
      obj.save({
        success: function(theObject) {
          console.log("Object saved!");
          console.log(theObject);
        },
        failure: function(theObject, errorString) {
          console.log("Error saving object: " + errorString);
        }
      });
    }
  });
};


var loginOrSignupScreen = function() {
  console.log("********************************");
  console.log("*       Sign Up or Login       *");
  console.log("********************************");
  inquirer.prompt([{
    type: "list",
    name: "start",
    message: "Would you like to signup or login?",
    choices: ["Signup", "Login"],
  }], function(answer) {
    if (answer.start == "Login") {
      inquirer.prompt(credentialsQuestion, function(credentials) {
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
      inquirer.prompt(credentialsQuestion, function(credentials) {
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
  console.log(" * Creating a user");
  console.log(" * Logging in with a user");
  console.log(" * Creating an object in an application scope bucket.");
  console.log(" * Creating an object body.\n");
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
