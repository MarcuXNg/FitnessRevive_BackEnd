/* eslint-disable require-jsdoc */
/**
 * config all api routes
 */
import {getAllUser, getUserAccount, userCreate, userDelete, userRead, userUpdate, userCount, userCountPerWeek} from '../controllers/UserController.js'; // User
import {handleRegister, handleLogin, handleLogout} from '../controllers/LoginRegisterController.js'; // login, logout, register
import {checkUserJWT, checkUserPermission} from '../middleware/JWTAction.js'; // JWT & user Permission
import {PermissionCreateFunc, PermissionsReadFunc, PermisionDeleteFunc, PermissionUpdateFunc, PermissionsByRole, AssignPermissionToRole} from '../controllers/Permissioncontroller.js'; // Permissions
import {handleRefreshToken} from '../controllers/AuthController.js'; // auth handle refresh
import {roleReadFunc} from '../controllers/RoleController.js'; // Role
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
  router.get('/roles/read', roleReadFunc);
  router.get('/admin/permissions/read', PermissionsReadFunc);
  router.post('/admin/permissions/create', PermissionCreateFunc);
  router.put('/admin/permissions/update', PermissionUpdateFunc);
  router.delete('/admin/permissions/delete', PermisionDeleteFunc);
  router.get('/admin/permissions/by-role/:roleId', PermissionsByRole);
  router.post('/admin/permissions/assign-to-role', AssignPermissionToRole);

  // users
  router.get('/users', getAllUser);
  router.post('/users/create', userCreate);
  router.get('/users/read', userRead);
  router.put('/users/update', userUpdate);
  router.delete('/users/delete', userDelete);
  router.get('/users/count', userCount);
  router.get('/users/count-per-week', userCountPerWeek);


  return app.use('/api/v1/', router);
};


module.exports = {
  initWebRoutes,
};
