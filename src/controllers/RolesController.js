/* eslint-disable prefer-const */
import rolesAPIservice from '../service/rolesAPIservice.js';
const RolesCreateFunc = async (req, res) => {
  try {
    // validate
    let data = await rolesAPIservice.createNewRoles(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // date
    });
  }
};

const RolesUpdateFunc = async (req, res) => {

};

module.exports = {
  RolesCreateFunc,
  RolesUpdateFunc,
};
