const db = require('../database/database')
const dbPaciente = db.paciente;

exports.getAllPacientes = async () => {
    return await dbPaciente.findAll();
}

exports.getPacienteById = async (id) => {
    return await dbPaciente.findByPk(id);
};

exports.createPaciente = async (data) => {
    return await dbPaciente.create(data);
}

exports.updatePaciente = async (id, data) => {
    await dbPaciente.update(data, { where: { id_paciente: id } });
    return await dbPaciente.findOne({ where: { id_paciente: id } });
};


exports.deletePaciente = async (id) => {
    return await dbPaciente.destroy({ where: { id_paciente: id } });
};

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