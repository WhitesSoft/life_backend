const db = require('../database/database')
const dbHistorial = db.historial_clinico;
const dbExtraoral = db.extra_oral

exports.createHistorialExtraoral = async (id, data) => {

    // Verifica si el historial existe
    const historial = await dbHistorial.findByPk(id);

    if (!historial) {
        return null;
    }

    // verifico si el historial ya tiene un antecedente de salud asociada
    const existingExtraoral = await dbExtraoral.findOne({ where: { id_historial: id } });
    if (existingExtraoral) {
        throw new Error('Ya existe un examen extraoral asociada para este historial.');
    }

    // Pasamos nuestro id
    data.id_historial = id;

    return await dbExtraoral.create(data);
}

exports.getHistorialExtraoralById = async (id) => {
    return await dbExtraoral.findOne({
        where: { id_historial: id }
    });
};

exports.updateExtraoral = async (id, data) => {
    await dbExtraoral.update(data, { where: { id_historial: id } });
    return await dbExtraoral.findOne({ where: { id_historial: id } });
};
