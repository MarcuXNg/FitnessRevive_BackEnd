/* eslint-disable prefer-const */
import db from '../models/index';

const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ['url', 'description'],
      raw: true, // raw = false để lấy sequelize object, = true để lấy sequelize aray
    });

    const persists = roles.filter(({url: url1}) =>
      !currentRoles.some(({url: url2}) => url1 === url2),
    );
    if (persists.length === 0) {
      return {
        EM: 'Nothing to create',
        EC: 0,
        DT: [],
      };
    }
    await db.Role.bulkCreate(roles);
    return {
      EM: `Create ${persists.length} Role Successfully`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrongs with the services',
      EC: 1,
      DT: [],
    };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      order: [['id', 'DESC']],
    });
    return {
      EM: 'get all Roles',
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrongs with the services',
      EC: 1,
      DT: [],
    };
  }
};

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: {id: id},
    });
    if (role) {
      await role.destroy();
    }
    return {
      EM: 'Delete Role successfully',
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrongs with the services',
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  createNewRoles,
  getAllRoles,
  deleteRole,
};
