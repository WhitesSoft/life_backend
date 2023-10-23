const express = require('express');
const router = express.Router();
const pacienteController = require('../../controllers/pacienteController');
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
    .post('/create', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], pacienteController.create)
    .put('/update/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], pacienteController.update)
    .delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], pacienteController.remove)
    .get('/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], pacienteController.getById)
    .get('/', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], pacienteController.getAll)
    
    
module.exports = router;