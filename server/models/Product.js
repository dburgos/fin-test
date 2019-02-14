const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  created: {
    type: Date,
    default: Date.now
  }
}, {
    collection: 'products'
  });

module.exports = mongoose.model('Product', schema);