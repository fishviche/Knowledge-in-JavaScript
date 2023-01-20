const { Schema, model } = require('mongoose');
const ImageSchema = new Schema({
	name: { type: String, required: true },
	slug: { type: String, required: true },
	route: { type: String, required: true }
})
module.exports = model('Image', ImageSchema);