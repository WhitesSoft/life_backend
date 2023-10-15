const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { authJwt } = require('../../middlewares');


// Middleware para el encabezado CORS
router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router
    .get('/test/all', userController.allAccess)
    .get('/test/paciente', [authJwt.verifyToken, authJwt.isPaciente], userController.pacienteBoard)
    .get('/test/secretaria', [authJwt.verifyToken, authJwt.isSecretaria], userController.secretariaBoard)
    .get('/test/asistente', [authJwt.verifyToken, authJwt.isAsistente], userController.asistenteBoard)
    .get('/test/administrador', [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard)
// este es
// router
//     .get('/test/all', userController.allAccess)
//     .get('/:userId', userController.getOneUser)
//     .post('/:userId', userController.createNewUser)
//     .put('/:userId', userController.updateOneUser)
//     .delete('/:userId', userController.deleteOneUser)

module.exports = router;    