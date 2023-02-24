const { pool } = require('../database/database.js');
const reportService = require('../services/report.service.js')
const reportCtr = {};


reportCtr.getReports = async (req, res) => {
  const response = await reportService.getReport(req.query)
  res.json(response)
}

reportCtr.addReport = async (req, res, next) => {
  try{
    const response = await reportService.addReport(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
module.exports = reportCtr;