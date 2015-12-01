var program = require('commander');
var pkg = require('../package.json');
var hellokii = require('./');

program
  .version(pkg.version)
  .option('-s, --signup', 'signup a new user')
  .option('-l, --login', 'login with an existing user')
  .option('-c, --create', 'create an object')
  .parse(process.argv);

// initialise Kii SDK
hellokii.init();

// command line options
if (program.signup) return hellokii.signup();
if (program.login) return hellokii.login();
if (program.create) return hellokii.create();

// otherwise show usage info
program.help();
