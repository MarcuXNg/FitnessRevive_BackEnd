/* eslint-disable require-jsdoc */
/**
 * config all api routes
 */
import {getAllUser, getUserAccount, userCreate, userDelete, userRead, userUpdate, userCount, userCountPerWeek} from '../controllers/UserController.js'; // User
import {handleRegister, handleLogin, handleLogout} from '../controllers/LoginRegisterController.js'; // login, logout, register
import {checkUserJWT, checkUserPermission} from '../middleware/JWTAction.js'; // JWT & user Permission
import {RolesCreateFunc, RolesReadFunc, RolesDeleteFunc, RolesUpdateFunc, RolesByGroup, AssignRoleToGroup} from '../controllers/UrlController.js'; // Roles
import {handleRefreshToken} from '../controllers/AuthController.js';
import {groupReadFunc} from '../controllers/RoleController.js'; // Group
import express from 'express';
const router = express.Router();

const initWebRoutes = (app) => {
  // path handler

  // authorization & authentication
  router.all('*', checkUserJWT, checkUserPermission);

  // get account state and information for authorization
  router.get('/account', getUserAccount);

  // login register
  router.post('/register', handleRegister); // register
  router.post('/login', handleLogin); // login
  router.post('/logout', handleLogout); // logout
  router.get('/refresh', handleRefreshToken);

  // admin routes
  router.get('/admin/roles/read', RolesReadFunc);
  router.post('/admin/roles/create', RolesCreateFunc);
  router.put('/admin/roles/update', RolesUpdateFunc);
  router.delete('/admin/roles/delete', RolesDeleteFunc);
  router.get('/admin/roles/by-group/:groupId', RolesByGroup);
  router.post('/admin/roles/assign-to-group', AssignRoleToGroup);

  // users
  router.get('/users', getAllUser);
  router.post('/users/create', userCreate);
  router.get('/users/read', userRead);
  router.put('/users/update', userUpdate);
  router.delete('/users/delete', userDelete);
  router.get('/users/count', userCount);
  router.get('/users/count-per-week', userCountPerWeek);

  // group
  router.get('/group/read', groupReadFunc);

  return app.use('/api/v1/', router);
};


module.exports = {
  initWebRoutes,
};
