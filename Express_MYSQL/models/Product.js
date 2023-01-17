const { Schema, model } = require('mongoose');
/**
  * @param {string} inputFormat 
   * @returns {string}
 */

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true }
})

const BrandSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true }
})

const ProductSchema = new Schema({
  name: {  type: String, required: true },
  category: [CategorySchema],
  brand: [BrandSchema],
  slug: {  type: String, required: true },
  status: {  type: Boolean }
});

module.exports = model('Product', ProductSchema);
