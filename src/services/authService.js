const db = require('../database/database');
const dbUsuario = db.usuario;
const dbRol = db.rol;
const dbPersona = db.persona;
const dbOdontologo = db.odontologo;
const dbPaciente = db.paciente;
const Op = db.Sequelize.Op; // operadores especiales

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// registra admin (odontologo)
exports.registeradmin = async (req, res) => {

    try {

        const userWithOdontologo = {
            usuario: req.body.usuario,
            password: bcrypt.hashSync(req.body.password, 8),
            correo: req.body.correo,
            odontologo: {
                nombre: req.body.odontologo.nombre,
                apellido_paterno: req.body.odontologo.apellido_paterno,
                apellido_materno: req.body.odontologo.apellido_materno,
                direccion: req.body.odontologo.direccion,
                fecha_nacimiento: req.body.odontologo.fecha_nacimiento,
                genero: req.body.odontologo.genero,
                telefono: req.body.odontologo.telefono,
                correo: req.body.odontologo.correo,
                estado: req.body.odontologo.estado
            }
        };

        // Crear al usuario
        dbUsuario.create(userWithOdontologo, {

            // la relacion OneToOne
            include: [{
                model: dbOdontologo,
                as: 'odontologo'
            }]

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
            } 

        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};



// registra usuario (paciente)
exports.register = async (req, res) => {

    try {
        const userWithPaciente = {
            usuario: req.body.usuario,
            password: bcrypt.hashSync(req.body.password, 8),
            correo: req.body.correo,
            paciente: {
                nombre: req.body.paciente.nombre,
                apellido_paterno: req.body.paciente.apellido_paterno,
                apellido_materno: req.body.paciente.apellido_materno,
                direccion: req.body.paciente.direccion,
                fecha_nacimiento: req.body.paciente.fecha_nacimiento,
                genero: req.body.paciente.genero,
                telefono: req.body.paciente.telefono,
                correo: req.body.paciente.correo,
                estado: req.body.paciente.estado
            }
        };

        const newUser = await dbUsuario.create(userWithPaciente, {
            include: [{
                model: dbPaciente,
                as: 'paciente'
            }]
        });


        // Se le asigna rol por defecto (paciente)
        await newUser.setRoles([4]);
        res.send("El usuario se registró con éxito!");

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

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