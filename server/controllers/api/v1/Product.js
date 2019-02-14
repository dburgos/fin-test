const Product = require('../../../models/Product');

exports.list = (req, res) => {
  Product.find().lean().then((list) => {
    res.status(200).json(list);
  }).catch((err) => {
    res.status(500).send(err);
  });
};