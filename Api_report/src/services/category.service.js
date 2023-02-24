const { pool } = require('../database/database.js');
const categoryService = {}

categoryService.getSubCategory = async () => {
  const response = await pool.query(`SELECT * FROM subcategory`, [] );
  return response.rows ? response.rows : [];
};

categoryService.getCategories = async () => {
  const response = await pool.query(`SELECT * FROM category`, [] );
  return response.rows ? response.rows : [];
};

categoryService.addSubCategory = async (data) => {
  const { category_id, name } = data;
  response = await pool.query(
    `INSERT INTO subcategory(category_id, name)
      VALUES ($1, $2) RETURNING subcategory_id`, [ category_id, name ]
  );
  return {
    message: `Sub-Category added with ID: ${response.rows[0].subcategory_id}`,
    error: false
  }
};

module.exports = categoryService;