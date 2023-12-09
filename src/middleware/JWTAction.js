/* eslint-disable prefer-const */
require('dotenv').config();
import jwt from 'jsonwebtoken';

const nonSecurePaths = ['/register', '/login', '/logout'];

const createJWT = (payload) => {
  const key = process.env.JWT_SECRET;
  let token = null;

  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // console.log(token);
  } catch (error) {
    console.log(error);
  }

  return token;
};

const verifyToken = (token) => {
  const key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const extractToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  let tokenFromHeader = extractToken(req);

  if ((cookies && cookies.jwt) || tokenFromHeader) {
    // nếu ko có cookie thì sẽ lấy từ local storage
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let decoded;
    try {
      // check nếu token hợp lệ
      decoded = verifyToken(token);
      if (decoded) {
      // gán data user vô decoded
        req.user = decoded;
        req.token = token;
        return next();
      } else {
        return res.status(401).json({
          EC: -1,
          DT: '',
          EM: 'Not authenticated user',
        });
      }
    // console.log('my jwt', cookies.jwt);
    } catch (error) {
      // console.log(error);
      return res.status(401).json({
        EC: -1,
        DT: '',
        EM: 'Not authenticated user',
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: '',
      EM: 'Not authenticated user',
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();

  if (req.user) {
    // let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: `You don't have permission to access this resource...`,
      });
    }
    // hàm some trả ra true or false
    let canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: `You don't have permission to access this resource...`,
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: '',
      EM: 'Not authenticated user',
    });
  }
};
module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
