/* eslint-disable prefer-const */
import groupService from '../service/rolesService';

const groupReadFunc = async (req, res) => {
  try {
    let data = await groupService.getGroups();
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
  groupReadFunc,
};
