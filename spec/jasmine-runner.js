const Jasmine = require('jasmine');
const suiteReporter = require('jasmine-suite-reporter');
 
var jasmine = new Jasmine();
//Optional override of the default reporter 
jasmine.configureDefaultReporter({
  print: function(){}
});
//Register Reporter 
jasmine.addReporter(suiteReporter.create({
  includeStack: true
}));
//load configuration file 
jasmine.loadConfigFile('./spec/support/jasmine.json');
//Jasmine Start 
jasmine.execute();