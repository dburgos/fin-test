exports.validate = async (req, res, next) => {
  try {
    await requireToken(req, res);
    await checkToken(req, res);
  } catch (out) {
    return res.status(out.status).json(out);
  }
  next();
};

async function requireToken(req, res) {
  return new Promise((resolve, reject) => {
    const token = req.header('Authorization');
    const hasAuth = token && req.header('Authorization');
    if (!hasAuth) {
      const out = {
        status: 400,
        code: 'INVALID_AUTH',
        message: 'Authorization header is required'
      };
      return reject(out);
    }
    resolve();
  });
}

async function checkToken(req, res) {
  return new Promise((resolve, reject) => {
    const token = req.header('Authorization');
    const isValid = token === process.env.API_AUTH_TOKEN;
    if (!isValid) {
      const out = {
        status: 401,
        code: 'NOT_AUTHORIZED',
        message: 'Authorization header is invalid'
      };
      return reject(out);
    }
    resolve();
  });
}