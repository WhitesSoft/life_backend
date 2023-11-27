const db = require('../database/database')
const dbTurno = db.turno;
const dbAtencion = db.atencion;
const dbPagos = db.pagos;


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
    const atencion = await dbAtencion.create(data)

    // creo el pago
    const pago = await dbPagos.create({
        motivo: 'atencion', // Motivo predeterminado
        fecha: new Date(), // Fecha actual
        monto: data.monto, // Asumiendo que 'data' contiene el monto del pago
        id_atencion: atencion.id_atencion // Asociamos el pago con la atención
    });

    return {
        atencion,
        pago
    };
}