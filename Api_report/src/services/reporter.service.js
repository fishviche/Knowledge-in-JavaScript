const { pool } = require('../database/database.js');
const reporterService = {}

reporterService.findReporter = async(document_number) => {
  const data = await pool.query(
    `SELECT * FROM reporter
    WHERE document_number = $1`,
    [ document_number ]
  )
  return { user: data.rows[0] };
}

reporterService.addReporter = async(data) => {
  const { district_id, name, age, document_number } = data
  const query = await pool.query(
    `INSERT INTO reporter(district_id, name, age, document_number)
      VALUES ($1, $2, $3, $4)
      RETURNING reporter_id`,
    [
      district_id,
      name,
      age,
      document_number
    ]
  );
  return {
    message: `Reporter added with ID: ${query.rows[0].reporter_id}`,
    error: false
  }
}

module.exports = reporterService;