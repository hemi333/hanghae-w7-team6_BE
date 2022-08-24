module.exports = (err, req, res, next) => {
  console.error("logErrorHandler", "record :", err)
  const message = `${req.method} ${req.originalUrl} : ${error.message}`;
  console.log(message);
  return res.status(500).json({message: err.message})
}

