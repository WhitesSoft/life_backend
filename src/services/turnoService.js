const db = require('../database/database')
const dbTurno = db.turno;
const dbPaciente = db.paciente;

exports.getAllTurnos = async () => {
    return await dbTurno.findAll();
}

exports.getTurnoById = async (id) => {
    return await dbTurno.findByPk(id);
}

exports.getTurnoByIdPaciente = async (id) => {
    // Busca al paciente por su ID
    const paciente = await dbPaciente.findByPk(id, {
        include: [{
            model: dbTurno, // Incluye el modelo de Turno
            as: 'turnos', // Alias para la relación, asegúrate de que coincida con tu modelo
        }],
    });

    if (!paciente) {
        return null;
    }

    // Devuelve los turnos del paciente
    return paciente.turnos;
}

exports.createTurno = async (id, data) => {

    // Verifica si el paciente existe
    const paciente = await dbPaciente.findByPk(id);

    if (!paciente) {
        return null;
    }

    // Pasamos nuestro id
    data.id_paciente = id;

    return await dbTurno.create(data);
}

exports.updateTurno = async (id, data) => {
    await dbTurno.update(data, { where: { id_turno: id } });
    return await dbTurno.findOne({ where: { id_turno: id } });
};

exports.deleteTurno = async (id) => {
    return await dbTurno.destroy({ where: { id_turno: id } });
}