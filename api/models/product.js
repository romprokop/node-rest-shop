import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: {type: Number, required: true},
});

export default mongoose.model('Product', productSchema);
