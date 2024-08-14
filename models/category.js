const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: {
    type: Number,
    default: 0
  },
  taxType: String,
  subCategorys : {
    type : [mongoose.Schema.Types.ObjectId],
    default : [],
    ref : "SubCategory"
  }
});

module.exports = mongoose.model('Category', categorySchema);
