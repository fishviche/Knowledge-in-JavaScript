const { Pool } = require('pg');
const { db } = require('../config/config.js');
const pool = new Pool(db);
module.exports = {
  pool
}