const mysql = require('mysql2');
require('dotenv').config();

// Server config
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3005);
app.use(express.json());

const { getProduct, createNewProduct, deleteProduct, getOneProduct, updateProduct } = require('./controllers/product.controller');


app.get('/get-one-product/:id', getOneProduct);
app.post('/save-product', createNewProduct);
app.get('/get-products', getProduct);
app.delete('/delete-product/:id', deleteProduct);
app.put('/update-product/:id', updateProduct);
app.listen(app.get('port'), ()=>{
  console.log('Server on port: ', app.get('port'));
})