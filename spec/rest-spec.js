/*
describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {
      expect(200).toBe(200);
    });
  });
});
*/
'use strict';
var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');
//var jasmine = require('./jasmine-runner');


function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  }

describe('REST API request', function() {

  beforeEach(function(done) {
    require('./start-server');
    done();
  });

  afterEach(function(done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

  it('Data length should match', function(done) {
      json('get', '/api/AccountInfos/123456')
      .expect(200, function(err, res){
        //console.log(loopback.getModel('ACInfo'));
        assert.equal(res.body.ACInfo.length, 6, "Length not matched!");
        done();
      });
    });

  it('should match specific account number', function(done) {
    json('get', '/api/AccountInfos/123456')
      .expect(200, function(err, res){
        //console.log(res.body.ACInfo);
        assert.equal(res.body.ACInfo[1].AccountNumber, "123456", "AccountNumber do not match!");
        done();
      });
    });

    it('Rest API data should match transactionId', function(done) {
    json('get', '/api/AccountInfos/123456')
      .expect(200, function(err, res){
        //console.log(res.body.ACInfo);
        assert.equal(res.body.ACInfo[0]._dummyRestModels[0].transactionId, "123456", "rest data do not match!");
        done();
      });
    });

    it('Local data sort by TransactionId should match', function(done) {
    json('get', '/api/AccountInfos/123456?SortCode=TransactionId')
      .expect(200, function(err, res){
        //console.log(res.body.ACInfo);
        assert.equal(res.body.ACInfo[0].TransactionId, "001", "sort data do not match!");
        done();
      });
    });

  it('Local data sort by PermanentAccountNumber should match', function(done) {
    json('get', '/api/AccountInfos/123456?SortCode=PermanentAccountNumber')
      .expect(200, function(err, res){
        //console.log(res.body.ACInfo);
        assert.equal(res.body.ACInfo[1].PermanentAccountNumber, "111", "sort data do not match!");
        done();
      });
    });

});

