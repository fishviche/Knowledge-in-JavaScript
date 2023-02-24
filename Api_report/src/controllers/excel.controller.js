const reportExcelCtr = {};
const path = require('path');
const excelService = require('../services/excel.service.js')

reportExcelCtr.getExcel = async (req, res, next) => {
  try {
    const data = await excelService.createReporte();
    console.log(__dirname);
    res.download('../../Excel.xlsx');
  } catch (err) {
    next(err);
  }
};


reportExcelCtr.getReportByDistrict = async (req, res, next) => {
  try {
    const { district_id } = req.query
    const fileName = await excelService.getReportByDistrict(district_id);
    res.download(`${fileName}`);
  } catch (err) {
    next(err);
  }
};


module.exports = reportExcelCtr;