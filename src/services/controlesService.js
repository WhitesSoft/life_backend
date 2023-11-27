const db = require('../database/database')
const dbHistorial = db.historial_clinico
const dbControl = db.controles;

exports.getAllControlesByHistorial = async (idHistorial) => {

    const historial = await dbHistorial.findByPk(idHistorial)

    if(!historial){
        return null
    }

    return await dbControl.findAll({ where: { id_historial: idHistorial } });
}

exports.getControlById = async (idControl) => {
    return await dbControl.findByPk(idControl);
};

exports.updateControl = async (idControl, data) => {
    await dbControl.update(data, { where: { id_control: idControl } });
    return await dbControl.findOne({ where: { id_control: idControl } });
};

exports.deleteControl = async (idControl) => {
    return await dbControl.destroy({ where: { id_control: idControl } });
};