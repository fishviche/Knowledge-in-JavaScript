const { pool } = require('../database/database.js');
const { findReporter } = require('./reporter.service')
const reporterService = {}

async function getCountReport() {
  return await pool.query(`SELECT COUNT(*) FROM report`, []);
}

reporterService.getReport = async(data) => {
  let { limit, offset } = data;
  if(limit === undefined){limit = 100}
  if(offset === undefined){offset = 0}
  let countReport = await getCountReport();
  let total_report = parseInt(countReport.rows[0].count)
  let pages = Math.round(total_report/parseInt(limit));
  data = await pool.query(
    `SELECT * FROM report
    ORDER BY report_id ASC
    LIMIT $1 OFFSET $2`,
    [
      limit,
      offset
    ]
    );
  return {
    data: data.rows,
    total_report,
    pages
  }
}

reporterService.addReport = async (data) => {
  const {
    document_number,
    category_id,
    district_id,
    longitude,
    latitude,
    comments,
    score 
  } = data;
  const reporter = await findReporter(document_number)
  let { reporter_id } = reporter.user
  let geolocation = {
    "latitude": parseFloat(latitude),
    "logintude": parseFloat(longitude)
  }
  let params = {
    'url': [],
    'comments': comments
  }
  query = await pool.query(
    `INSERT INTO report(reporter_id, category_id, district_id, geolocation, params, score)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING report_id;`,
    [
      reporter_id,
      category_id,
      district_id,
      JSON.stringify(geolocation),
      JSON.stringify(params),
      score
    ]
  );
  return {
    message: `Report added with ID: ${query.rows[0].report_id}`,
    error: false
  }
}

module.exports = reporterService;