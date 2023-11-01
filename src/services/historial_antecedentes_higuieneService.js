const db = require('../database/database')
const dbHistorial = db.historial_clinico;
const dbAntecedentehiguiene = db.antecedentes_higuiene

exports.createHistorialAntecedenteHiguiene = async (id, data) => {

    // Verifica si el historial existe
    const historial = await dbHistorial.findByPk(id);

    if (!historial) {
        return null;
    }

    // verifico si el historial ya tiene un antecedente de salud asociada
    const existingAntecedenteHiguiene = await dbAntecedentehiguiene.findOne({ where: { id_historial: id } });
    if (existingAntecedenteHiguiene) {
        throw new Error('Ya existe un antecedente de higuiene asociada para este historial.');
    }

    // Pasamos nuestro id
    data.id_historial = id;

    return await dbAntecedentehiguiene.create(data);
}

exports.getHistorialAntecedenteHiguieneById = async (id) => {
    return await dbAntecedentehiguiene.findOne({
        where: { id_historial: id }
    });
};

exports.updateAntecedenteHiguiene = async (id, data) => {
    await dbAntecedentehiguiene.update(data, { where: { id_historial: id } });
    return await dbAntecedentehiguiene.findOne({ where: { id_historial: id } });
};
