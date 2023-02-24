const categoryCtr = {};
const categoryService = require('../services/category.service.js')

categoryCtr.getSubCategory = async (req, res, next) => {
  try {
    const data = await categoryService.getSubCategory();
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
};

categoryCtr.getCategories = async (req, res, next) => {
  
  try {
    const data = await categoryService.getCategories();
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

categoryCtr.addSubCategory = async (req, res, next) => {
  try {
    const response = await categoryService.addSubCategory(req.body);
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
};
module.exports = categoryCtr;