/* eslint-disable prefer-const */
import db from '../models/index';

const getRoles = async () => {
  try {
    let data = await db.Role.findAll({
      order: [['name', 'DESC']],
    });
    return {
      EM: 'Get roles success',
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrong with service',
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getRoles,
};
