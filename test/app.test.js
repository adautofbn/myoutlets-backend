/* eslint-disable */

const app = require('../src/index');
const request = require('supertest');
const mocha = require('mocha');

describe('GET /produto', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/produto')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});