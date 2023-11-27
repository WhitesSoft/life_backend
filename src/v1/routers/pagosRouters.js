const express = require('express');
const router = express.Router();
const pagosController = require('../../controllers/pagosController');
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
    .get('/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], pagosController.getById)
    .get('/', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], pagosController.obtenerPagosConDetalles)
    
    
module.exports = router;