const userService = require('../service/userService.js');

// Create and Save a new Tutorial
exports.createNewUser = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  await userService.createNewUser(email, password, firstname, lastname);
  // console.log('>>>check req', req.body);
  res.status(200).redirect('http://localhost:3000/user');
};

// Find a single Tutorial by Id
exports.userById = async (req, res) => {
  const user = await userService.userById(req.params.id);
  if (!user) {
    return res.status(404).send('404 NOT FOUND');
  }
  // console.log(req.params.id);
  return res.send(user);
};

// // Update a Tutorial identified by the id in the request
// exports.getUpdate = async (req, res) => {
//   // Validate Request
//   const id = req.params.id;
//   const user = await userService.updateUserByID(id);
//   let userData = {};
//   if (user && user.length > 0) {
//     userData = user[0];
//   }
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

