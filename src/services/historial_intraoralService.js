const db = require('../database/database')
const dbHistorial = db.historial_clinico;
const dbIntraoral = db.intra_oral

exports.createHistorialIntraoral = async (id, data) => {

    // Verifica si el historial existe
    const historial = await dbHistorial.findByPk(id);

    if (!historial) {
        return null;
    }

    // verifico si el historial ya tiene un antecedente de salud asociada
    const existingIntraoral = await dbIntraoral.findOne({ where: { id_historial: id } });
    if (existingIntraoral) {
        throw new Error('Ya existe un examen intra oral asociada para este historial.');
    }

    // Pasamos nuestro id
    data.id_historial = id;

    return await dbIntraoral.create(data);
}

exports.getHistorialIntraoralById = async (id) => {
    return await dbIntraoral.findOne({
        where: { id_historial: id }
    });
};

exports.updateIntraoral = async (id, data) => {
    await dbIntraoral.update(data, { where: { id_historial: id } });
    return await dbIntraoral.findOne({ where: { id_historial: id } });
};
