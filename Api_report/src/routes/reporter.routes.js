const { Router } = require('express');
const router = Router();
const { getReporter, addReporter } = require('../controllers/reporter.controller');

router.get('/get-reporter', getReporter);
router.post('/add-reporter', addReporter);
module.exports = router;