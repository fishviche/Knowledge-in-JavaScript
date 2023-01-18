const productCtr = {};
const mysql = require('mysql2');
const fs = require('fs/promises');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT
});

connection.connect( async (err) => {
  if (err) throw err;
  const createTable = await fs.readFile('./models/Product.sql', { encoding: 'utf8' });
  const results = await connection.promise().query(createTable)
  console.log('Connected to database');
});


productCtr.createNewProduct = async (req, res) => {
  const { name, slug, category, brand, status } = req.body
  let insertproduct = `INSERT INTO products (name, slug, category, brand, status) VALUES (?, ?, ?, ?, ?)`;
  let query = mysql.format(insertproduct, [name, slug, JSON.stringify(category), JSON.stringify(brand), status ]);
  response =  await connection.promise().query(query);
  res.json(response[0]);
}

productCtr.getProduct = async (req, res) => {
	const results = await connection.promise().query('SELECT * FROM products')
  res.json(results[0]);
}

productCtr.deleteProduct = async (req, res) => {
  const product_id = req.params.id
  const results = await connection.promise().query('DELETE FROM products WHERE product_id = ?', [product_id])
	res.json(results[0]);
}
productCtr.getOneProduct = async (req, res) => {
  const product_id = req.params.id;
	const results = await connection.promise().query('SELECT * FROM products WHERE product_id = ?', [product_id])
  res.json(results[0]);
}
productCtr.updateProduct = async (req, res) => {
  const { name, slug, category, brand, status } = req.body;
  const product_id = req.params.id;
  const results = await connection.promise().query(`UPDATE products 
  SET name = ?, slug = ?, category = ?, brand = ?, status = ?
  WHERE product_id = ?`, [ name, slug, JSON.stringify(category), JSON.stringify(brand), status, product_id ])
	res.json(results[0]);
}

module.exports = productCtr;