const db = require('../database/database')
const dbFactura = db.factura;
const dbPagos = db.pagos;
const dbHistorial = db.historial_clinico;
const moment = require('moment');

exports.createFactura = async (idPago, data) => {

    const { detalle, nit, senor, total } = data;

    // Primero, verifica si el pago existe y no tiene ya una factura asociada
    const pago = await dbPagos.findByPk(idPago);
    if (!pago) {
        throw new Error('El pago no existe.');
    }

    const facturaExistente = await dbFactura.findOne({ where: { id_pago: idPago } });
    if (facturaExistente) {
        throw new Error('Este pago ya tiene una factura asociada.');
    }

    // Ahora, crea la factura
    const nuevaFactura = await dbFactura.create({
        id_pago: idPago,
        detalle,
        fecha: moment(), // Fecha actual, puedes cambiar esto si recibes la fecha en 'datosFactura'
        nit,
        senor, // Asegúrate de que 'senor' es el nombre correcto de la columna en la base de datos
        total
    });

    return nuevaFactura;

}