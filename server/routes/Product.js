const API = require('../controllers/API');

module.exports = (router) => {
  router.get('/api/v1/products', API.v1.Product.list);
};
