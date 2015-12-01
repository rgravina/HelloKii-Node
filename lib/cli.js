var clear = require('clear');
var hellokii = require('./');

// clear the screen
clear();

// initialise Kii SDK
hellokii.init();

// start tour
hellokii.tour();
