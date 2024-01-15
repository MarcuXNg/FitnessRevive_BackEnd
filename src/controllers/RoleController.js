/* eslint-disable prefer-const */
import rolesService from '../service/rolesService';

const roleReadFunc = async (req, res) => {
  try {
    let data = await rolesService.getRoles();
    // console.log(data);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: data.DT, // data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server',
      EC: '-1',
      DT: '',
    });
  }
};
module.exports = {
  roleReadFunc,
};
