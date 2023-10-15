// const userService = require('../services/userService')

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.asistenteBoard = (req, res) => {
    res.status(200).send("asistene Content.");
};

exports.secretariaBoard = (req, res) => {
    res.status(200).send("secretaria Content.");
};

exports.pacienteBoard = (req, res) => {
    res.status(200).send("paciente Content.");
};





// const getAllUsers = (req, res) => {
//     const allUsers = userService.allUsers();
//     res.send('Todos los usuarios');
// };

// const getOneUser = (req, res) => {
//     const oneUser = userService.getOneUser(req.params.userId);
//     res.send(`Usuario con el id: ${req.params.userId}`)
// }

// const createNewUser = (req, res) => {
//     const createUser = userService.createNewUser(req.params.userId);
//     res.send(`Usuario creado con el id: ${req.params.userId}`)
// };

// const updateOneUser = (req, res) => {
//     const updateUser = userService.updateOneUser(req.params.userId);
//     res.send(`Usuario actualizado con el id: ${req.params.userId}`)
// };

// const deleteOneUser = (req, res) => {
//     userService.deleteOneUser(req.params.userId);
//     res.send(`Usuario borrado con el id: ${req.params.userId}`)
// };


// module.exports = {
//     getAllUsers,
//     getOneUser,
//     createNewUser,
//     updateOneUser,
//     deleteOneUser
// }