const Product = require('./routes/Product');

module.exports = function (app) {
  Product(app);

  // 404
  app.use((req, res) => {
    const output = {
      code: 'NOT_FOUND',
      message: `Route ${req.url} not found`
    };
    return res.status(404).json(output);
  });

  // 500
  app.use((err, req, res) => {
    const output = {
      code: 'ERROR',
      message: err
    };
    return res.status(500).json(output);
  });
};
