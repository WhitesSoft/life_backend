const express = require('express');
const router = express.Router();
const authService = require('../../services/authService');
const { verifyRegister } = require('../../middlewares');

// Middleware para el encabezado CORS
router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router
    .post('/registeradmin', [verifyRegister.checkDuplicateEmail, verifyRegister.checkDuplicateUsuario, verifyRegister.checkRolesExisted], authService.registeradmin)
    .post('/register', [verifyRegister.checkDuplicateEmail, verifyRegister.checkDuplicateUsuario, verifyRegister.checkRolesExisted], authService.register)
    .post('/login', authService.login)


module.exports = router;    