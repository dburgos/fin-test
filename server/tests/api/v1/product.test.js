const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const server = require('../../../../server');

chai.use(chaiHttp);

describe('API V1 Product', () => {

  before(function (done) {
    mongoose.connection.once('open', function () {
      done();
    });
  });

  describe('GET', () => {

    it('serves the product list', (done) => {
      chai.request(server)
        .get('/api/v1/products')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST', () => {

    it('validates name as required when it\'s missing', (done) => {
      const newProduct = {
        description: 'Without name test'
      };
      chai.request(server)
        .post('/api/v1/products')
        .send(newProduct)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('saves the product successfully', (done) => {
      const newProduct = {
        name: 'Testing name',
        description: 'Success test'
      };
      chai.request(server)
        .post('/api/v1/products')
        .send(newProduct)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('_id');
          done();
        });
    });
  });

});