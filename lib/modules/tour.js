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

module.exports = function () {
  console.log("********************************");
  console.log("*            HelloKii          *");
  console.log("********************************");
  console.log("\nThis application will give you a quick tour of some of Kii Cloud's basic features.\n")
  console.log(" * Creating a user");
  console.log(" * Logging in with a user");
  console.log(" * Creating an object in a bucket.\n");

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
            console.log("User logged in successfully.");
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
            console.log("User registered successfully.");
          },
          failure: function(kiiUser, errorString) {
            console.log("Error registering user. " + errorString);
          }
        });
      });      
    }
  });  
};
