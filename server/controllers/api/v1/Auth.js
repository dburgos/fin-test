exports.validate = (req, res, next) => {
  const token = req.header('Authorization');
  const hasAuth = token && req.header('Authorization');
  if (!hasAuth) {
    const out = {
      code: 'INVALID_AUTH',
      message: 'Authorization header is required'
    };
    return res.status(400).json(out);
  }
  const isValid = token === process.env.API_AUTH_TOKEN;
  if (!isValid) {
    const out = {
      code: 'NOT_AUTHORIZED',
      message: 'Authorization header is invalid'
    };
    return res.status(401).json(out);
  }
  next();
};