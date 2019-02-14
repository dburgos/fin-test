const API = require('../controllers/API');

module.exports = (router) => {
  router.get('/api/v1/products', API.v1.Product.list);
  router.post('/api/v1/products', API.v1.Auth.validate, API.v1.Product.insert);
  router.delete('/api/v1/products/:id', API.v1.Auth.validate, API.v1.Product.remove);
};
