const userService = require('../service/userService.js');


// Retrieve all Tutorials from the database (with condition).
exports.getAllUser = async (req, res) => {
  const userList = await userService.getAllUser();
  // console.log('check user list:', userList);
  return res.send({userList});
};


// // Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: 'Content can not be empty!',
//     });
//   }

//   console.log(req.body);

//   Tutorial.updateById(req.params.id, new Tutorial(req.body), (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`,
//         });
//       } else {
//         res.status(500).send({
//           message: 'Error updating Tutorial with id ' + req.params.id,
//         });
//       }
//     } else res.send(data);
//   });
// };

// Delete a Tutorial with the specified id in the request
exports.deleteUser = async (req, res) => {
  // console.log(req.params.id);
  await userService.deleteUser(req.params.id);
  return res.redirect('http://localhost:3000');
};

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.removeAll((err, data) => {
//     if (err) {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all tutorials.',
//       });
//     } else res.send({message: `All Tutorials were deleted successfully!`});
//   });
// };

// Update a Tutorial identified by the id in the request
exports.getUpdate = async (req, res) => {
  // Validate Request
  const id = req.params.id;
  const user = await userService.updateUserByID(id);
  let userData = {};
  if (user && user.length > 0) {
    userData = user[0];
  };
};