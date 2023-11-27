const db = require('../database/database')
const dbPaciente = db.paciente;
const dbHistorial = db.historial_clinico;
const dbControl = db.controles;

exports.getAllHistoriales = async () => {
    return await dbHistorial.findAll();
}

exports.getHistorialById = async (id) => {
    return await dbHistorial.findByPk(id);
};

exports.updateHistorial = async (id, data) => {
    await dbHistorial.update(data, { where: { id_historial: id } });
    return await dbHistorial.findOne({ where: { id_historial: id } });
};

exports.deleteHistorial = async (id) => {
    await dbPaciente.destroy({ where: { id_paciente: id } });
    return await dbHistorial.destroy({ where: { id_historial: id } });
};

exports.crearControl = async (idHistorial, data) => {

    const historial = await dbHistorial.findByPk(idHistorial);

    //console.log('entraaa', idHistorial, detalle, historial);
    if (!historial) {
        return null
    }

    return await dbControl.create({
        detalle: data.detalle,
        id_historial: idHistorial,
    })
}