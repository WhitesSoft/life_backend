const express = require('express');
const router = express.Router();
const turnoController = require('../../controllers/turnoController');
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
    .post('/create/:idPaciente', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], turnoController.create)
    .put('/update/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], turnoController.update)
    .delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], turnoController.remove)
    .get('/:id', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], turnoController.getById)
    .get('/', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], turnoController.getAll)
    .get('/paciente/:idPaciente', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isAsistente, authJwt.isSecretaria], turnoController.getByIdPaciente)
    
    
module.exports = router;