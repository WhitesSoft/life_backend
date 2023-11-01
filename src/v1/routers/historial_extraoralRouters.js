const express = require('express');
const router = express.Router();
const historialExtraoralController = require('../../controllers/historial_extraoralController');
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
    .post('/create/:idHistorial', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], historialExtraoralController.create)
    .put('/update/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], historialExtraoralController.update)
    .get('/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], historialExtraoralController.getById)

    
    
module.exports = router;