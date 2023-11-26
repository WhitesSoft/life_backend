const db = require('../database/database');
const dbUsuario = db.usuario;
const dbAsistente = db.asistente
const dbSecretaria = db.secretaria
const dbPersonal = db.personal
const dbAsistenciaPersonal = db.asistencia_personal
const dbPagos = db.pagos
const sequelize = db.sequelize
const { Op } = require("sequelize");

var bcrypt = require('bcryptjs');
const TARIFA_DIARIA = 100;

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

exports.getById = async (id) => {
    return await dbPersonal.findByPk(id);
}

exports.updatePersonal = async (id, data) => {
    await dbPersonal.update(data, { where: { id_personal: id } });
    return await dbPersonal.findOne({ where: { id_personal: id } });
}

// exports.deletePersonal = async (id) => {
//     return await dbPersonal.destroy({ where: { id_personal: id } });
// };
exports.deletePersonal = async (id) => {
    const asistente = await dbAsistente.findOne({ where: { id_personal: id } });
    const secretaria = await dbSecretaria.findOne({ where: { id_personal: id } });
    if (asistente) {
        console.log(asistente.id_usuario);
        await dbUsuario.destroy({ where: { id_usuario: asistente.id_usuario } });
        await dbAsistente.destroy({ where: { id_personal: id } });
    }

    if (secretaria) {
        await dbUsuario.destroy({ where: { id_usuario: asistente.id_usuario } });
        await dbSecretaria.destroy({ where: { id_personal: id } });
    }

    return await dbPersonal.destroy({ where: { id_personal: id } });
};

exports.controlarAsistencia = async (idPersonal, fecha, asistio) => {

    const personal = await dbPersonal.findByPk(idPersonal)

    if (!personal) {
        return null
    }

    return await dbAsistenciaPersonal.create({
        id_personal: idPersonal,
        fecha: fecha,
        estado_asistencia: asistio
    })

};

exports.pagosPersonal = async (idPersonal, motivo) => {

    const personal = await dbPersonal.findByPk(idPersonal)

    if (!personal) {
        return null
    }

    const inicioMes = new Date();
    inicioMes.setDate(1);
    const finMes = new Date(inicioMes.getFullYear(), inicioMes.getMonth() + 1, 0);
    console.log(inicioMes, finMes);

    const diasTrabajados = await dbAsistenciaPersonal.count({
        where: {
            id_personal: idPersonal,
            fecha: {
                [Op.between]: [inicioMes, finMes] // filtrar valores por rangos
            },
            estado_asistencia: true
        }
    });

    console.log(diasTrabajados);

    const monto = diasTrabajados * TARIFA_DIARIA;

    return await dbPagos.create({
        fecha: new Date(),
        monto: monto,
        motivo: motivo,
        id_personal: idPersonal
    });

}
