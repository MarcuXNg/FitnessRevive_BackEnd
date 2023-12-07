/* eslint-disable require-jsdoc */
/**
 * config all api routes
 */
import {createNewUser, userById, getAllUser, getUserAccount} from '../controllers/UserController.js';
import {deleteUser, getUpdateUserPage} from '../controllers/AdminController.js';
import {handleRegister, handleLogin} from '../controllers/loginRegisterController.js';
import {checkUserJWT, checkUserPermission} from '../middleware/JWTAction.js';
import express from 'express';
const router = express.Router();

const initWebRoutes = (app) => {
  // path handler


  router.all('*', checkUserJWT, checkUserPermission);
  // Create a new Tutorial
  // router.post('/', createNewUser);

  // register
  router.post('/register', handleRegister);

  // Login
  router.post('/login', handleLogin);

  //
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
