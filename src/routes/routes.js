/* eslint-disable require-jsdoc */
/**
 * config all api routes
 */
import {userById, getAllUser, getUserAccount} from '../controllers/UserController.js';
import {deleteUser, getUpdateUserPage} from '../controllers/AdminController.js';
import {handleRegister, handleLogin, handleLogout} from '../controllers/loginRegisterController.js';
import {checkUserJWT, checkUserPermission} from '../middleware/JWTAction.js';
import {RolesCreateFunc, RolesReadFunc, RolesDeleteFunc, RolesUpdateFunc} from '../controllers/RolesController.js';
import express from 'express';
const router = express.Router();

const initWebRoutes = (app) => {
  // path handler


  router.all('*', checkUserJWT, checkUserPermission);
  // Create a new Tutorial
  // router.post('/', createNewUser);

  //
  router.post('/register', handleRegister); // register
  router.post('/login', handleLogin); // login
  router.post('/logout', handleLogout); // logout

  // admin routes
  // roles routes
  // router.get('/admin/roles/read', RolesReadFunc);
  router.post('/admin/roles/create', RolesCreateFunc);
  // router.put('/admin/roles/update', RolesUpdateFunc);
  // router.delete('/admin/roles/delete', RolesDeleteFunc);

  // get account state and information for authorization
  router.get('/account', getUserAccount);

  // Retrieve all All UserData
  router.get('/users', getAllUser);

  // Retrieve a single Tutorial with id
  router.get('/users/:id', userById);

  // Update a Tutorial with id
  // router.put('/:id', tutorials.update);
  router.post('users/update/:id', getUpdateUserPage);

  // // Delete a user with id
  router.delete('/users/:id', deleteUser);
  // router.post('/delete-user/:id', deleteUser);

  // // Delete all Tutorials
  // router.delete('/', tutorials.deleteAll);

  return app.use('/api/v1/', router);
};


module.exports = {
  initWebRoutes,
};
