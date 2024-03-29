/* eslint-disable prefer-const */
import db from '../models/index';

const createNewPermission = async (roles) => {
  try {
    let currentRoles = await db.RolePermission.findAll({
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
    await db.RolePermission.bulkCreate(roles);
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

const getAllPermissions = async () => {
  try {
    let data = await db.RolePermission.findAll({
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

const deletePermission = async (id) => {
  try {
    let role = await db.RolePermission.findOne({
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

const getPermissionsByRole = async (id) => {
  try {
    if (!id) {
      return {
        EM: 'Permission not found',
        EC: 0,
        DT: [],
      };
    }

    let roles = await db.Role.findOne({
      where: {id: id},
      attributes: ['id', 'name', 'description'],
      include: {
        model: db.RolePermission,
        attributes: ['id', 'url', 'description'],
        through: {attributes: []}, // ko lấy bảng đính kèm
      },
    });

    if (roles) {
      return {
        EM: 'Get permissions by role successfully',
        EC: 0,
        DT: roles,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrongs with the services',
      EC: 1,
      DT: [],
    };
  }
};

const assignPermissionToRole = async (data) => {
  try {
    await db.Permission.destroy({
      where: {
        roleId: +data.roleId,
      },
    });
    await db.Permission.bulkCreate(data.rolePermissions);
    return {
      EM: 'Assign Permissions to role successfully',
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
  createNewPermission,
  getAllPermissions,
  deletePermission,
  getPermissionsByRole,
  assignPermissionToRole,
};
