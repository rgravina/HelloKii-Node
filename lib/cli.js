var program = require('commander');
var hellokii = require('./');
var pkg = require('../package.json');

program
  .version(pkg.version)
  .parse(process.argv);

program.help();
