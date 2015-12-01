var fs = require('fs');
var https = require('https');
var inquirer = require('inquirer');
var pkg = require('../../package.json');
var ua = pkg.name + '#' + pkg.version;

var questions = [{
  type: "input",
  name: "username",
  message: "Username"
}, {
  type: "password",
  name: "password",
  message: "Password"
}];

module.exports = function () {
  console.log('Signup a new user.');
  inquirer.prompt(questions, function(credentials) {
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
};
