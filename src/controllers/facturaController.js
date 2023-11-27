const facturaService = require('../services/facturaService');

exports.crearFactura = async (req, res) => {
    try {
        const datosFactura = req.body; // Asume que el cuerpo de la solicitud tiene todos los datos necesarios
        const factura = await facturaService.createFactura(req.params.id, datosFactura);
        res.status(201).json(factura);
    } catch (error) {
        const statusCode = error.message.startsWith('El pago no existe') || error.message.startsWith('Este pago ya tiene una factura asociada') ? 400 : 500;
        res.status(statusCode).send(JSON.stringify({ message: error.message }));
    }
};
