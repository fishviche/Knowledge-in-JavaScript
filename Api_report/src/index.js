const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan'); 
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error.handler.js')
const bodyParser = require('body-parser')
// Config
app.set('port', process.env.PORT || 3001);

// Middlewares
// app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use(routes);

//  Handle error
app.use(errorHandler);
// Start server
app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'));
})