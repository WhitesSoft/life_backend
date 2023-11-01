const db = require('../database/database')
const dbTurno = db.turno;
const dbAtencion = db.atencion;


exports.createAtencion = async(id, data) => {
    // verifico si el turno existe
    const turno = await dbTurno.findByPk(id)

    if(!turno){
        return null
    }

    // verifico si el turno ya tiene una atención asociada
    const existingAtencion = await dbAtencion.findOne({ where: { id_turno: id } });
    if(existingAtencion) {
        throw new Error('Ya existe una atención registrada para este turno.');
    }

    // pasamos el id del turno
    data.id_turno = id

    return await dbAtencion.create(data)
}