const db = require('../database/database');
const ROLES = db.ROLES;
const dbUsuario = db.usuario;

// Metodo para verificar el duplicado de correos
checkDuplicateEmail = (req, res, next) => {

    // Verificar email
    dbUsuario.findOne({
        where: {
            correo: req.body.correo
        }
    }).then(usuario => {
        if (usuario) {
            res.status(400).send({
                message: '¡Error! ¡El correo electrónico ya está en uso!'
            });
            return;
        }
        next();
    });

};

// Metodo para verificar si el rol existe
checkRolesExisted = (req, res, next) => {
    if (req.body.nombre_rol) {
        for (let i = 0; i < req.body.nombre_rol.length; i++) {
            if (!ROLES.includes(req.body.nombre_rol[i])) {
                res.status(400).send({
                    message: "¡Fallido! El rol no existe = " + req.body.nombre_rol[i]
                });
                return;
            }
        }
    }

    next();
};

const verifyRegister = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifyRegister;
