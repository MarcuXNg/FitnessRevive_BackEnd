/* eslint-disable prefer-const */
import db from '../models/index.js';
const jwt = require('jsonwebtoken');
import {getRolesWithUrl} from '../service/JWTservice.js';

// handle Login
const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    // Check if the jwt cookie is present

    if (!cookies?.jwt) {
      return res.status(401).json({
        EM: 'Unauthorized.', // error message
        EC: '-1', // error code (error = -1, success = 0)
      });
    }

    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});

    const foundRefreshToken = await db.JWTs.findOne({
      where: {refreshToken: refreshToken},
    });

    const foundUser = await db.User.findOne({
      where: {id: foundRefreshToken.userId},
      include: [{model: db.UserProfile}],
    });
    console.log(foundUser.dataValues.UserProfile.dataValues);
    // Detect refreshToken reuse!
    if (!foundRefreshToken) {
      try {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_JWT_SECRET,
            async (err, decoded) => {
              if (err) {
                return res.status(403).json({
                  EM: 'Forbidden.', // error message
                  EC: '-1', // error code (error = -1, success = 0)
                });
              } // Forbidden

              // Delete all refresh tokens for the hacked user
              await db.JWTs.destroy({where: {userId: foundUser.userId}});
            },
        );
        return res.status(403).json({
          EM: 'Forbidden.', // error message
          EC: '-1', // error code (error = -1, success = 0)
        });
      } catch (error) {
        console.log(error);
        return res.status(401).json({
          EC: -1,
          DT: '',
          EM: 'Not authenticated user',
        });
      }
    } // Unauthorized


    try {
      // Evaluate jwt
      jwt.verify(
          refreshToken,
          process.env.REFRESH_JWT_SECRET,
          async (err, decoded) => {
            if (err) {
              // If the refresh token is expired, remove it
              await foundRefreshToken.destroy();
            }

            if (err || foundUser.dataValues.email !== decoded.email) {
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
            res.cookie('jwt', newRefreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});

            // Send the new access token to the user
            res.json({
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
      return res.status(401).json({
        EC: -1,
        DT: '',
        EM: 'Not authenticated user',
      });
    }
  } catch (error) {
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
