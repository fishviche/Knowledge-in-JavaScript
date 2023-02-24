const { Router } = require('express');
const router = Router();
const { getStates, getProvinces, getDistricts } = require('../controllers/location.controller');

router.get('/get-states', getStates);
router.get('/get-province', getProvinces)
router.get('/get-district', getDistricts)
module.exports = router