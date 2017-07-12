'use strict';

/*module.exports = (Accountinformation) => {

  // define remote method
  Accountinformation.getLocation = (data) => {
    return new Promise((resolve, reject) => {

      resolve(data);

    });
  }

  // expose remote method
  Accountinformation.remoteMethod('getLocation', {
    accepts: { arg: 'data', type: 'string', http: { source: 'body' } },
    returns: { arg: 'data', type: 'string', root: true },
    http: { path: '/find', verb: 'post' }
  });

};
*/
//import * as testmodule from '../service/test';//import not supporting
var testModule = require('../service/test');

module.exports = function(Accountinformation) {
    Accountinformation.test = function(msg, cb) {
      testModule.testObject.testMethod('hi', msg)
      cb(null, 'Testing... ' + msg);
    }

    Accountinformation.remoteMethod('test', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'output', type: 'string'}
    });
};
