const express = require('express');
const router = express.Router();
const personalController = require('../../controllers/personalController');
const { verifyRegister } = require('../../middlewares');
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
    .post('/registrarasistente', [authJwt.verifyToken, authJwt.isAdmin, verifyRegister.checkDuplicateEmail,
    verifyRegister.checkDuplicateUsuario, verifyRegister.checkRolesExisted], personalController.createAsistente)
    .post('/registrarsecretaria', [authJwt.verifyToken, authJwt.isAdmin, verifyRegister.checkDuplicateEmail,
    verifyRegister.checkDuplicateUsuario, verifyRegister.checkRolesExisted], personalController.createSecretaria)
    .get('/', [authJwt.verifyToken, authJwt.isAdmin], personalController.getAllPersonal)
    .get('/:id', [authJwt.verifyToken, authJwt.isAdmin], personalController.getById)
    .delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], personalController.remove)


module.exports = router;    