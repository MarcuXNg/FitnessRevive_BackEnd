/* eslint-disable prefer-const */
import db from '../models/index.js';
const jwt = require('jsonwebtoken');
import {getRolesWithUrl} from '../service/JWTservice.js';

// handle Login
const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies; // Check if the jwt cookie is present

    if (!cookies?.jwt) {
      console.log('No JWT cookie found.');
      return res.status(401).json({
        EM: 'Unauthorized.', // error message
        EC: '-1', // error code (error = -1, success = 0)
      });
    }

    const refreshToken = cookies.jwt;
    await res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});

    const foundRefreshToken = await db.JWTs.findOne({
      where: {refreshToken: refreshToken},
    });

    // Detect refreshToken reuse!
    if (!foundRefreshToken) {
      jwt.verify(
          refreshToken,
          process.env.REFRESH_JWT_SECRET,
          async (err, decoded) => {
            if (err) {
              console.log('Error decoding token:', err);
              return res.status(403).json({
                EM: 'attempted refresh token reuse!', // error message
                EC: '-1', // error code (error = -1, success = 0)
              });
            } // Forbidden

            // Delete all refresh tokens for the hacked user
            if (decoded.userId) {
              await db.JWTs.destroy({where: {userId: decoded.userId}});
            } else {
              return res.status(403).json({
                EM: 'Forbidden.',
                EC: '-1',
              });
            }
          },
      );
      return res.status(403).json({
        EM: 'Forbidden.', // error message
        EC: '-1', // error code (error = -1, success = 0)
      });
    } // Unauthorized


    try {
      const foundUser = await db.User.findOne({
        where: {id: foundRefreshToken.userId},
        include: [{model: db.UserProfile}],
      });

      // Evaluate jwt
      jwt.verify(
          refreshToken,
          process.env.REFRESH_JWT_SECRET,
          async (err, decoded) => {
            if (err) {
              // If the refresh token is expired, remove it
              await foundRefreshToken.destroy();
            }

            if (err || foundUser.dataValues.email !== decoded.email || foundUser.email !== decoded.email) {
              return res.status(403).json({
                EM: 'Forbidden.', // error message
                EC: '-1', // error code (error = -1, success = 0)
              });
            };

            // Refresh token was still valid

            // Create a new access token
            // get roles
            let rolesWithPermission = await getRolesWithUrl(foundUser);
            let payload = {
              rolesWithPermission,
              email: decoded.email,
              username: foundUser.dataValues.UserProfile.dataValues.last_name + ' ' + foundUser.dataValues.UserProfile.dataValues.first_name,
            };
            const accessToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES_IN},
            );

            // Create a new refresh token
            const newRefreshToken = jwt.sign(
                payload,
                process.env.REFRESH_JWT_SECRET,
                {expiresIn: process.env.REFRESH_JWT_EXPIRES_IN},
            );

            // Update the existing JWTs entry with the new refresh token
            await foundRefreshToken.update({refreshToken: newRefreshToken});

            // Set a new secure cookie with the new refresh token
            await res.cookie('jwt', newRefreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});

            // Send the new access token to the user
            return res.json({
              EM: 'okela!',
              EC: 0,
              DT: {
                access_token: accessToken,
                rolesWithPermission,
                email: decoded.email,
                username: foundUser.dataValues.UserProfile.dataValues.last_name + ' ' + foundUser.dataValues.UserProfile.dataValues.first_name,
              },
            });
          },
      );
    } catch (error) {
      // console.log(error);
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: 'Forbidden.',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // data
    });
  }
};

module.exports = {
  handleRefreshToken,
};
