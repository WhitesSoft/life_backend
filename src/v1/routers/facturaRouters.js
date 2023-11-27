const express = require('express');
const router = express.Router();
const facturaController = require('../../controllers/facturaController');
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
    .post('/create/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], facturaController.crearFactura)


module.exports = router;