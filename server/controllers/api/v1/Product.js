const Product = require('../../../models/Product');

exports.list = (req, res) => {
  Product.find().lean().then((list) => {
    res.status(200).json(list);
  }).catch((err) => {
    res.status(500).send(err);
  });
};

exports.insert = (req, res) => {
  const hasName = req.body.name && req.body.name !== "null";
  if (!hasName) {
    const out = {
      code: 'INVALID_PARAM',
      message: 'name field is required'
    };
    return res.status(400).json(out);
  }
  Product.create(req.body).then(product => {
    res.status(200).json(product);
  }).catch(err => {
    res.status(500).send(err);
  });
};