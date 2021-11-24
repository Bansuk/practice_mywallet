import jwt from 'jsonwebtoken';

async function verifyToken(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.split('Bearer ')[1];

  if (!token) {
    return null;
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (!user) return null;

  req.user = user;

  next();
}

export default verifyToken;
