module.exports = (app) => {
  const {createNewUser, userById} = require('../controllers/UserController.js');
  const {getAllUser, deleteUser, getUpdate} = require('../controllers/AdminController.js');

  const express = require('express');
  const router = express.Router();

  // Create a new Tutorial
  router.post('/', createNewUser);

  // Retrieve all Tutorials
  router.get('/', getAllUser);

  // Retrieve a single Tutorial with id
  router.get('/:id', userById);

  // Update a Tutorial with id
  // router.put('/:id', tutorials.update);
  router.post('/update-user/:id', getUpdate);

  // // Delete a user with id
  router.delete('/:id', deleteUser);
  router.post('/delete-user/:id', deleteUser);

  // // Delete all Tutorials
  // router.delete('/', tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
