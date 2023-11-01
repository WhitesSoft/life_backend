const db = require('../database/database')
const dbPaciente = db.paciente;
const dbHistorial = db.historial_clinico;
const moment = require('moment');

exports.getAllPacientes = async () => {
    return await dbPaciente.findAll();
}

exports.getPacienteById = async (id) => {
    return await dbPaciente.findByPk(id);
};

exports.createPaciente = async (data) => {

    const pacienteWithHistorialClinico = {
        nombre: data.nombre,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        direccion: data.direccion,
        fecha_nacimiento: data.fecha_nacimiento,
        genero: data.genero,
        telefono: data.telefono,
        correo: data.correo,
        estado: true,
        historial: {
            nombre: data.nombre,
            apellido_paterno: data.apellido_paterno,
            apellido_materno: data.apellido_materno,
            direccion: data.direccion,
            sexo: data.genero,
            telefono: data.telefono,
            fecha_nacimiento: data.fecha_nacimiento,
            fecha_creacion: moment(),
            estado: true
        }
    }

    return await dbPaciente.create(pacienteWithHistorialClinico, {
        // la relacion OneToOne
        include: [{
            model: dbHistorial,
            as: 'historial'
        }]
    });

}

exports.updatePaciente = async (id, data) => {
    await dbPaciente.update(data, { where: { id_paciente: id } });
    return await dbPaciente.findOne({ where: { id_paciente: id } });
};


exports.deletePaciente = async (id) => {
    await dbHistorial.destroy({ where: { id_paciente: id } })
    return await dbPaciente.destroy({ where: { id_paciente: id } });
};



// Esto imprimirá la fecha en el formato dd-mm-yyyy


// try {
//     const newPaciente = await db.paciente.create({
//         nombre: paciente.nombre,
//         apellido_paterno: paciente.apellido_paterno,
//         apellido_materno: paciente.apellido_materno,
//         direccion: paciente.direccion,
//         fecha_nacimiento: paciente.fecha_nacimiento,
//         genero: paciente.genero,
//         telefono: paciente.telefono,
//         correo: paciente.correo,
//         estado: paciente.estado
//     })

//     res.send("El paciente se registró con éxito!");

// } catch (error) {
//     res.status(500).send({ message: error.message });
// }