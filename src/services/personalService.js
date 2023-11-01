const db = require('../database/database');
const dbUsuario = db.usuario;
const dbAsistente = db.asistente
const dbSecretaria = db.secretaria
const dbPersonal = db.personal
const sequelize = db.sequelize

var bcrypt = require('bcryptjs');

exports.registrarPersonalAsistente = async (data) => {

    let transaction = await sequelize.transaction();

    const userWithAsistente = {
        usuario: data.usuario,
        password: bcrypt.hashSync(data.password, 8),
        correo: data.correo,
        asistente: {
            nombre: data.asistente.nombre,
            apellido_paterno: data.asistente.apellido_paterno,
            apellido_materno: data.asistente.apellido_materno,
            direccion: data.asistente.direccion,
            fecha_nacimiento: data.asistente.fecha_nacimiento,
            genero: data.asistente.genero,
            telefono: data.asistente.telefono,
            correo: data.asistente.correo,
        }
    };

    const newUser = await dbUsuario.create(userWithAsistente, {
        include: [{
            model: dbAsistente,
            as: 'asistente'
        }],
        transaction: transaction
    });

    await newUser.setRoles([2], { transaction: transaction });

    const personal = await dbPersonal.create({
        nombre: data.asistente.nombre,
        apellido_paterno: data.asistente.apellido_paterno,
        apellido_materno: data.asistente.apellido_materno,
        direccion: data.asistente.direccion,
        fecha_nacimiento: data.asistente.fecha_nacimiento,
        genero: data.asistente.genero,
        telefono: data.asistente.telefono,
        correo: data.asistente.correo,
        rol: 'Asistente',
        asistencia: 0
    }, { transaction: transaction });

    await newUser.asistente.setPersonal(personal, { transaction: transaction });

    await transaction.commit();

    return "Personal - Asistente registrado con éxito";

};

exports.registrarPersonalSecretaria = async (data) => {

    let transaction = await sequelize.transaction();

    const userWithAsistente = {
        usuario: data.usuario,
        password: bcrypt.hashSync(data.password, 8),
        correo: data.correo,
        secretaria: {
            nombre: data.secretaria.nombre,
            apellido_paterno: data.secretaria.apellido_paterno,
            apellido_materno: data.secretaria.apellido_materno,
            direccion: data.secretaria.direccion,
            fecha_nacimiento: data.secretaria.fecha_nacimiento,
            genero: data.secretaria.genero,
            telefono: data.secretaria.telefono,
            correo: data.secretaria.correo
        }
    };

    const newUser = await dbUsuario.create(userWithAsistente, {
        include: [{
            model: dbSecretaria,
            as: 'secretaria'
        }],
        transaction: transaction
    });

    await newUser.setRoles([3], { transaction: transaction });

    const personal = await dbPersonal.create({
        nombre: data.secretaria.nombre,
        apellido_paterno: data.secretaria.apellido_paterno,
        apellido_materno: data.secretaria.apellido_materno,
        direccion: data.secretaria.direccion,
        fecha_nacimiento: data.secretaria.fecha_nacimiento,
        genero: data.secretaria.genero,
        telefono: data.secretaria.telefono,
        correo: data.secretaria.correo,
        rol: 'Secretaria',
        asistencia: 0
    }, { transaction: transaction });

    await newUser.secretaria.setPersonal(personal, { transaction: transaction });

    await transaction.commit();

    return "Personal - Secretaria registrado con éxito";

};

exports.getAllPersonal = async () => {
    return await dbPersonal.findAll();
}

exports.getById = async(id) => {
    return await dbPersonal.findByPk(id);
}

// exports.deletePersonal = async (id) => {
//     return await dbPersonal.destroy({ where: { id_personal: id } });
// };
exports.deletePersonal = async (id) => {
    const asistente = await dbAsistente.findOne({ where: { id_personal: id } });
    if (asistente) {
        console.log(asistente.id_usuario);
        await dbUsuario.destroy({ where: { id_usuario: asistente.id_usuario } });
        await dbAsistente.destroy({ where: { id_personal: id } });
    }
    return await dbPersonal.destroy({ where: { id_personal: id } });
};
