// 'use strict';
//
// const path = require('path');
// // load default variables for testing
// require('dotenv').config({ path: path.join(__dirname, '../../.env.example') });
//
// var app = require('../../app');
// var request = require('supertest');
// // var nock = require('nock');
//
// describe('offline tests', function() {
//
//   describe('server', function() {
//     it('should return HTML for GET /', function(done) {
//       request(app).get('/').expect(200, /<html/, done);
//     });
//
//     it('should return a 404 for bogus urls', function(done) {
//       request(app).get('/foo/bar').expect(404, done);
//     });
//
//   });
//
// });
