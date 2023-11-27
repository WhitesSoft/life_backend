const express = require('express');
const router = express.Router();
const controlController = require('../../controllers/controlesController');
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
    .put('/update/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], controlController.update)
    .delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], controlController.remove)
    .get('/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], controlController.getById)
    .get('/lista/:idHistorial', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], controlController.getAllByHistorial)
    
    
module.exports = router;