import db from '../models/index';

const getGroupWithRoles = async (user) => {
//   console.log(user.dataValues.UserProfile.dataValues);
  const roles = await db.Group.findOne({
    where: {id: user.dataValues.UserProfile.dataValues.groupId},
    attributes: ['id', 'name', 'description'],
    include: {
      model: db.Role,
      attributes: ['id', 'url', 'description'],
      through: {attributes: []},
    },
  });

  return roles ? roles : {};
};

module.exports = {
  getGroupWithRoles,
};
