require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.DB_MONGO_URI;
console.log(MONGODB_URI)
const { createNewProduct, getOneProduct, getProducts, deleteProduct, updateProduct } = require('./controllers/product.controller');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
mongoose.connect(MONGODB_URI)
.then(() => console.log('Connected!'))
.catch(err => console.log(err));


app.get('/get-product', getProducts);
app.get('/get-one-product/:id', getOneProduct);
app.post('/save-product', createNewProduct);
app.delete('/delete-product/:id', deleteProduct);
app.put('/update-product/:id', updateProduct);

app.listen(app.get('port'), ()=>{
    console.log('Server on port: ', app.get('port'));
})