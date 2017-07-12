
var app = require('../../../server/server');
var loopback = require("loopback");
var Q = require('q');


module.exports.ModelAcInfoFind = null;
module.exports = function(ACInfo) {
    var restApiDS = app.datasources.dummyRestApi;

  /*ACInfo.beforeRemote('getAcInfoById', function(context, unused, next) {
    //module.exports.ModelAcInfoFind = null;
    next();
  });*/

/*
   var ds = loopback.createDataSource('memory');
  var CompositeACInfoModel = {
    localData: ACInfo,
    restData: String
  };
  var outputAry = []

  var CompositeACInfoExpanded = ds.define('CompositeACInfoExpanded', CompositeACInfoModel);


  function composeWithRestApi(acinfos) {
    var promises = [];  // array for storing promises

    acinfos.forEach((item, index, array) => {
        var def = Q.defer();        // create deferred object and store
        promises.push(def.promise); // its promise in the array
        restApiCall(item, def.resolve);// resolve the promise in the async function's callback
    });
    // pass the array to Q.all, only when all are resolved will "callback" be called
    return Q.all(promises);
  }

function restApiCall (item, cb) {
  
  restApiDS.searchApi(item.accountType, function (err, results) {
      var output = { 
        localData: null,
        restData: null
      };
      output.localData = item;
      output.restData = results;
      outputAry.push(output);
      cb();
  });
  
}

ACInfo.listAcInfo = function(limit, callback) {
  var Model = app.models.ACInfo;

  Model.find(null, function(err, acinfos) {
        if(err) {
        callback(err); return;
        }

  composeWithRestApi(acinfos).then(function() {
              //console.log('complete', outputAry)
              callback(null,outputAry)
            });
});

}

ACInfo.updateAcInfo = function(acInfo, callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
    var Model = app.models.ACInfo;
      Model.update(acInfo, function(er, result) {
              if (er) return;
              console.log('AcInfo updated: ', result);
      return;
    });
    callback(null,acInfo);
}
*/
ACInfo.createAcInfo = function(acInfo, callback) {
    var Model = app.models.ACInfo;
    //console.log(acInfo);
      Model.create(acInfo, function(err, result) {
              /*if (err) {
                console.log(err)
                return;
              };*/
              //console.log('AcInfo created: ');
      return;
    });
    callback(null,acInfo);
}

ACInfo.getAcInfoById = function(AccountNumber, SortCode, callback) {
    var modelAcInfoFind = null;
    module.exports.ModelAcInfoFind = (!module.exports.ModelAcInfoFind)?app.models.ACInfo:module.exports.ModelAcInfoFind; 
    module.exports.ModelAcInfoFind.find({where: {"AccountNumber": AccountNumber}}, function(err, acinfos) {
      /*if(err) {       callback(err); return;      }*/
      var newAcInfos = acinfos;
      newcomposeWithRestApi(newAcInfos).then(function() {
              var acinfos = sortByKey(newAcInfos, SortCode);
              callback(null,newAcInfos);
            });
      });
}

function newcomposeWithRestApi(acinfos) {
    var promises = [];  // array for storing promises
    acinfos.forEach((item, index, array) => {
        var def = Q.defer();        // create deferred object and store
        promises.push(def.promise); // its promise in the array
        newrestApiCall(item, def.resolve);// resolve the promise in the async function's callback
    });// pass the array to Q.all, only when all are resolved will "callback" be called
    return Q.all(promises);
  }

function newrestApiCall (item, cb) {
  restApiDS.searchApi(item.AccountNumber, function (err, results) {
    var newrestModel = ACInfo.app.models.dummyRestModel;
      newrestModel.create( {transactionId:results.content, transactionDetail: results.title},
        function(err, newData)
        {
          item._dummyRestModels.push(newData);
          cb();
        }
      )
  }); 
}

function sortByKey(array, key) {
    if(!key) return array;
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

/*
ACInfo.getExternalApiData = function(param1, callback) {
  var restApiDS = app.datasources.dummyRestApi;
  restApiDS.searchApi('some value', function (err, results) {
      //console.log(err,JSON.stringify(results), '=======================');
      callback(null, 'call to getdummyApi: ' + param1 + ' Complete!');
    });
}
*/
}
