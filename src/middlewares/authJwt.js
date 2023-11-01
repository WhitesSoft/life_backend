const db = require('../database/database');
const jwt = require("jsonwebtoken");
const dbUsuario = db.usuario;

// Metodo para verificar el token
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send(JSON.stringify({
            message: "¡No se proporciona un token!"
        }));
    }

    // aqui verifica el token
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).send(JSON.stringify({
                message: "No autorizado!",
            }));
        }
        req.userId = decoded.id;
        console.log("TOKEN userID:" + req.userId);
        next();
    })
};

isAdmin = (req, res, next) => {
    // Buscar el usuario por su ID
    dbUsuario.findByPk(req.userId).then(usuario => {
        // Obtener los roles asociados al usuario
        usuario.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nombre_rol === "administrador") {
                    next();
                    return;
                }
            }

            res.status(403).send(JSON.stringify({
                message: "¡Requiere rol de administrador!"
            }));
            return;
        });
    });
}

isAsistente = (req, res, next) => {
    // Buscar el usuario por su ID
    dbUsuario.findByPk(req.userId).then(usuario => {
        // Obtener los roles asociados al usuario
        usuario.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nombre_rol === "asistente") {
                    next();
                    return;
                }
            }

            res.status(403).send(JSON.stringify({
                message: "¡Requiere rol de asistente!"
            }));
            return;
        });
    });
}

isSecretaria = (req, res, next) => {
    // Buscar el usuario por su ID
    dbUsuario.findByPk(req.userId).then(usuario => {
        // Obtener los roles asociados al usuario
        usuario.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nombre_rol === "secretaria") {
                    next();
                    return;
                }
            }

            res.status(403).send(JSON.stringify({
                message: "¡Requiere rol de secretaria!"
            }));
            return;
        });
    });
}

isPaciente = (req, res, next) => {
    // Buscar el usuario por su ID
    dbUsuario.findByPk(req.userId).then(usuario => {
        // Obtener los roles asociados al usuario
        usuario.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nombre_rol === "paciente") {
                    next();
                    return;
                }
            }

            res.status(403).send(JSON.stringify({
                message: "¡Requiere rol de paciente!"
            }));
            return;
        });
    });
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAsistente: isAsistente,
    isSecretaria: isSecretaria,
    isPaciente: isPaciente
};

module.exports = authJwt;