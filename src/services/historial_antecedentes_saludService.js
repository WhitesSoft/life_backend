const db = require('../database/database')
const dbHistorial = db.historial_clinico;
const dbAntecedentesSalud = db.antecedentes_salud

exports.createHistorialAntecedenteSalud = async (id, data) => {

    // Verifica si el historial existe
    const historial = await dbHistorial.findByPk(id);

    if (!historial) {
        return null;
    }

    // verifico si el historial ya tiene un antecedente de salud asociada
    const existingAntecedente = await dbAntecedentesSalud.findOne({ where: { id_historial: id } });
    if (existingAntecedente) {
        throw new Error('Ya existe un antecedente de salud asociada para este historial.');
    }

    // Pasamos nuestro id
    data.id_historial = id;

    return await dbAntecedentesSalud.create(data);
}

exports.getHistorialAntecendeteById = async (id) => {
    return await dbAntecedentesSalud.findOne({
        where: { id_historial: id }
    });
};

exports.updateHistorialAntecedente = async (id, data) => {
    await dbAntecedentesSalud.update(data, { where: { id_historial: id } });
    return await dbAntecedentesSalud.findOne({ where: { id_historial: id } });
};

