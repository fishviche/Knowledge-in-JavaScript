const { Router } = require('express');
const router = Router();
const { addSubCategory, getSubCategory , getCategories } = require('../controllers/category.controller');

router.post('/sub-category/add-category', addSubCategory);
router.get('/get-category', getCategories);
router.get('/sub-category/get-sub-category', getSubCategory);
module.exports = router;