/* eslint-disable */

const app = require('../src/index');
const request = require('supertest');
const mocha = require('mocha');

describe('GET /', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done)
  });
});

describe('GET /produto', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/produto')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done)
  });
});

describe('GET /bolsa', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/bolsa')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done)
  });
});