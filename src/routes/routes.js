/**
 * config all api routes
 */
import {createNewUser, userById} from '../controllers/UserController.js';
import {getAllUser, deleteUser, getUpdateUserPage} from '../controllers/AdminController.js';
import {handleRegister, handleLogin} from '../controllers/loginRegisterController.js';
import express from 'express';
const router = express.Router();
// const {handleRegister} = require('../controllers/loginRegisterController.js');

module.exports = (app) => {
  // path handler

  // Create a new Tutorial
  router.post('/', createNewUser);

  // register
  router.post('/register', handleRegister);

  // Login
  router.post('/login', handleLogin);

  // Retrieve all Tutorials
  router.get('/', getAllUser);

  // Retrieve a single Tutorial with id
  router.get('/:id', userById);

  // Update a Tutorial with id
  // router.put('/:id', tutorials.update);
  router.post('/update-user/:id', getUpdateUserPage);

  // // Delete a user with id
  router.delete('/:id', deleteUser);
  router.post('/delete-user/:id', deleteUser);

  // // Delete all Tutorials
  // router.delete('/', tutorials.deleteAll);

  app.use('/api/v1', router);
};
