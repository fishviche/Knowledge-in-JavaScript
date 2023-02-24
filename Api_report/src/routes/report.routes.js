const { Router } = require('express');
const router = Router();
const { getReports, addReport } = require('../controllers/report.controller');

router.get('/get-report', getReports);
router.post('/add-report', addReport)
module.exports = router