const mongoose = require('mongoose');

const otherItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required:true,
  },
  number:{
    type:Number,
    required:true,
   },
  price: {
    type: Number,
    required: true,
  },
  image:{
    type:String,
    required:true
  }
   
});

const otherItems = mongoose.model('Schema', otherItemsSchema );
module.exports=otherItems;
