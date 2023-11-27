const pagoService = require('../services/pagosService');

exports.obtenerPagosConDetalles = async (req, res) => {
    try {
        const pagosConAtencion = await pagoService.obtenerPagosConDetalles();
        const pagosParaFrontend = pagosConAtencion.map(pago => {
            const nombreCompleto = `${pago.atencion.nombre} ${pago.atencion.apellido_paterno} ${pago.atencion.apellido_materno}`;
            return {
                paciente: nombreCompleto,
                monto: pago.monto,
                fecha: pago.fecha, 
                id: pago.id_pago
            };
        });
        res.json(pagosParaFrontend);
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.message }));
    }
};

exports.getById = async (req, res) => {
    try {
        const pago = await pagoService.getById(req.params.id);
        if (pago) {
            res.status(200).send(JSON.stringify(pago));
        } else {
            res.status(404).send(JSON.stringify({ message: "Pago no encontrado." }));
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.message }));
    }
};
