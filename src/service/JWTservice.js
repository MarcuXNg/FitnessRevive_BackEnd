import db from '../models/index';

const getRolesWithUrl = async (user) => {
//   console.log(user.dataValues.UserProfile.dataValues);
  const roles = await db.Role.findOne({
    where: {id: user.dataValues.UserProfile.dataValues.roleId},
    attributes: ['id', 'name', 'description'],
    include: {
      model: db.RolePermission,
      attributes: ['id', 'url', 'description'],
      through: {attributes: []},
    },
  });

  return roles ? roles : {};
};

module.exports = {
  getRolesWithUrl,
};
