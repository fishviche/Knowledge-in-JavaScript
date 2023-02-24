const errorHandler = (err, req, res, next) => {
  return res.json({
    message: err.message,
    error: true
  })
};
module.exports = {
  errorHandler
};