const { Router } = require('express');
const router = Router();
const { getExcel, getReportByDistrict } = require('../controllers/excel.controller.js');

router.get('/get-report-excel', getExcel);
router.get('/get-report-by-district', getReportByDistrict);
module.exports = router;