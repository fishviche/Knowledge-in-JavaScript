const locationService = require('../services/location.service.js')
const locationCtr = {};

locationCtr.getStates = async (req, res, next) => {
  try {
    const { country_id } = req.query
    const response = await locationService.getStates(country_id);
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
}
locationCtr.getProvinces = async (req, res, next) => {
  try {
    const { state_id } = req.query
    const response = await locationService.getProvinces(state_id);
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
}
locationCtr.getDistricts = async (req, res, next) => {
  try {
    const { province_id } = req.query
    const response = await locationService.getDistricts(province_id);
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
}
module.exports = locationCtr;