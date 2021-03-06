const Product = require('../../../models/Product');

exports.list = (req, res) => {
  Product.find().lean().then((list) => {
    res.status(200).json(list);
  }).catch((err) => {
    res.status(500).send(err);
  });
};

exports.insert = async (req, res) => {
  await requireName(req, res);
  Product.create(req.body).then(product => {
    res.status(200).json(product);
  }).catch(err => {
    res.status(500).send(err);
  });
};

exports.remove = async (req, res) => {
  await requireParamId(req, res);
  const query = {
    _id: req.params.id
  };
  Product.deleteOne(query).then((data) => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).send(err);
  })
};

async function requireName(req, res) {
  return new Promise(resolve => {
    const hasName = req.body.name && req.body.name !== "null";
    if (!hasName) {
      const out = {
        code: 'INVALID_PARAM',
        message: 'name field is required'
      };
      return res.status(400).json(out);
    }
    resolve();
  });
}

async function requireParamId(req, res) {
  return new Promise(resolve => {
    const id = req.params.id;
    const hasId = id && id !== "null";
    if (!hasId) {
      const out = {
        code: 'INVALID_PARAM',
        message: 'id field is required'
      };
      return res.status(400).json(out);
    }
    resolve();
  });
}