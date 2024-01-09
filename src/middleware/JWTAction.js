/* eslint-disable prefer-const */
require('dotenv').config();
import jwt from 'jsonwebtoken';

const nonSecurePaths = ['/register', '/login', '/logout', '/refresh'];

const createJWT = (payload) => {
  const key = process.env.JWT_SECRET;
  let token = null; // token default = null
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
  }

  return token;
};

const createRefreshJWT = (payload) => {
  const refreshKey = process.env.REFRESH_JWT_SECRET;
  let refreshToken = null;
  try {
    refreshToken = jwt.sign(payload, refreshKey, {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
  }
  return refreshToken;
};

// verify Token
const verifyToken = (token) => {
  // console.log(token);
  const key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Token is expired
      console.log('Token expired:', error.expiredAt);
      return null;
    } else {
      // Other JWT verification errors
      console.log('Error verifying token:', error.message);
      return null;
    }
  }
  return decoded;
};

// verify Refresh Token
const verifyRefreshToken = (token) => {
  // console.log(token);
  const key = process.env.REFRESH_JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Token is expired
      console.log('Token expired:', error.expiredAt);
      return null;
    } else {
      // Other JWT verification errors
      console.log('Error verifying token:', error.message);
      return null;
    }
  }
  return decoded;
};


// extractToken from the header request
const extractToken = (req, res) => {
  const tokenExtracted = req.headers.authorization || req.headers.Authorization;
  if (!tokenExtracted?.startsWith('Bearer ')) {
    if (res) {
      return res.status(401).json({
        EC: -1,
        DT: '',
        EM: 'Unsecured token',
      });
    } ;
  }
  if (tokenExtracted && tokenExtracted.split(' ')[0] === 'Bearer') {
    return tokenExtracted.split(' ')[1];
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next(); // If the requested path is in nonSecurePaths, proceed to the next middleware.

  let tokenFromHeader = extractToken(req); // Extract the JWT token from the request headers.

  if (tokenFromHeader) {
    let token = tokenFromHeader;
    let decoded;
    try {
      // check nếu token hợp lệ
      decoded = verifyToken(token);
      // If the token is valid, set user data in the request object and proceed to the next middleware.
      if (decoded) {
      // gán data user vô decoded
        req.user = decoded;
        req.token = token;
        return next(); // pass control immediately to thes next middleware function in the stack, and no further code in the current middleware is executed after that point.
      } else {
        return res.status(401).json({
          EC: -1,
          DT: '',
          EM: 'Not authenticated user hi hi',
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
    let roles = req.user.rolesWithPermission.URLs;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: `You don't have permission to access this resource...`,
      });
    }
    // hàm some trả ra true or false
    let canAccess = roles.some((item) => item.url === currentUrl || currentUrl.includes(item.url));
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
  createRefreshJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
  verifyRefreshToken,
};
