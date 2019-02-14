const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const server = require('../../../../server');

chai.use(chaiHttp);

let productId = null;

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

    it('validates if auth it\'s missing', (done) => {
      chai.request(server)
        .post('/api/v1/products')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('validates if auth is invalid', (done) => {
      chai.request(server)
        .post('/api/v1/products')
        .set('Authorization', 'whatever')
        .end((err, res) => {
          expect(res.status).to.equal(401);
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
        .set('Authorization', process.env.API_AUTH_TOKEN)
        .send(newProduct)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('_id');
          productId = res.body._id;
          done();
        });
    });
  });

  describe('DELETE', () => {

    it('validates if auth it\'s missing', (done) => {
      chai.request(server)
        .delete(`/api/v1/products/${productId}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('validates if auth is invalid', (done) => {
      chai.request(server)
        .delete(`/api/v1/products/${productId}`)
        .set('Authorization', 'whatever')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('validates id as required when it\'s null', (done) => {
      chai.request(server)
        .delete('/api/v1/products/null')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('removes the product successfully', (done) => {
      chai.request(server)
        .delete(`/api/v1/products/${productId}`)
        .set('Authorization', process.env.API_AUTH_TOKEN)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

});