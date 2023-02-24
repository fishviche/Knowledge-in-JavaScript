const { pool } = require('../database/database.js');
const locationService = {}

locationService.getStates = async (country_id) => {
  const response = await pool.query(`SELECT * FROM state WHERE country_id = $1`, [country_id]);
  return response.rows ? response.rows : [];
};
locationService.getProvinces = async (state_id) => {
  const response = await pool.query(`SELECT * FROM province WHERE state_id = $1`, [state_id]);
  return response.rows ? response.rows : [];
};
locationService.getDistricts = async (province_id) => {
  const response = await pool.query(`SELECT * FROM district WHERE province_id = $1`, [province_id]);
  return response.rows ? response.rows : [];
};
module.exports = locationService;