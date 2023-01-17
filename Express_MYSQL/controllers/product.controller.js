const productCtr = {};
const Product = require('../models/Product')

productCtr.createNewProduct = async (req, res) => {
	const { name, slug, status , categoryName, categorySlug, brandName, brandSlug } = req.body;
	const newProduct = new Product({ name, slug, status });
    newProduct.category.push({name: categoryName, slug: categorySlug});
    newProduct.brand.push({name: brandName, slug: brandSlug});
	res.json(await newProduct.save());
}
productCtr.getProducts = async (req, res) => {
	res.json(await Product.find());
}
productCtr.deleteProduct = async (req, res) => {
	id = req.params.id
	res.json(await Product.findByIdAndDelete(id));
}
productCtr.getOneProduct = async (req, res) => {
	id = req.params.id
	res.json(await Product.findById(id));
}
productCtr.updateProduct = async (req, res) => {
	const { name, slug, status , categoryName, categorySlug, brandName, brandSlug } = req.body;
	const data = {
		name,
		slug,
		status,
        category: {name: categoryName, slug: categorySlug},
        brand: {name: brandName, slug: brandSlug}
	}
    id = req.params.id
	response = await Product.findByIdAndUpdate(id, data);
    res.json(response);
}

module.exports = productCtr;