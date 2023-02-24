const reporterService = require('../services/reporter.service.js')
const reporterCtr = {};

reporterCtr.getReporter = async (req, res, next) => {
  try {
    const { document_number } = req.query
    const response = await reporterService.findReporter(document_number);
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
}
reporterCtr.addReporter = async (req, res, next) => {
  try {
    const response = await reporterService.addReporter(req.body);
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
}
module.exports = reporterCtr;