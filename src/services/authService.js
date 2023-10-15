const db = require('../database/database');
const dbUsuario = db.usuario;
const dbRol = db.rol;
const Op = db.Sequelize.Op; // operadores especiales

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// registra usuario
exports.register = (req, res) => {

    // Guardar usuario
    dbUsuario.create({
        usuario: req.body.usuario,
        password: bcrypt.hashSync(req.body.password, 8),
        correo: req.body.correo,
    }).then(usuario => {
        // Verifica si a un usuario se le paso roles
        if (req.body.roles) {
            // busca los roles en la base de datos
            dbRol.findAll({
                where: {
                    nombre_rol: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                usuario.setRoles(roles).then(() => {
                    res.send("El usuario se registró con éxito!");
                });
            })
        } else {
            // Se le asigna rol por defecto (paciente)
            usuario.setRoles([4]).then(() => {
                res.send("El usuario se registró con éxito!");
            });
        }
    });
};

// Login usuario
exports.login = (req, res) => {
    // Busca un usuario
    dbUsuario.findOne({
        where: {
            usuario: req.body.usuario
        }
    }).then(usuario => {
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, usuario.password);

        // password invalido
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Password invalido!"
            });
        }

        // password correcto
        const token = jwt.sign({ id: usuario.id_usuario }, process.env.SECRET_KEY, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 horas duracion
        });

        var authorities = [];
        usuario.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].nombre_rol.toUpperCase());
            }
            res.status(200).send({
                id_usuario: usuario.id,
                usuario: usuario.usuario,
                correo: usuario.correo,
                roles: authorities,
                token: token
            });
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
};