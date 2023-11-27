const atencionService = require('../services/atencionService')


exports.registrarAtencion = async (req, res) => {
    try {
        const atencion = await atencionService.createAtencion(req.params.idTurno, req.body)
        if (atencion !== null) {
            res.status(201).send(JSON.stringify({ message: "Atencion y pago registrado con exito!" }));
        } else {
            res.status(404).send(JSON.stringify({ message: "No existe el turno" }));
        }
    } catch (error) {
        if (error.message === 'Ya existe una atención registrada para este turno.') {
            res.status(400).send(JSON.stringify({ message: error.message })); 
        } else {
            res.status(500).send(JSON.stringify({ message: error.message }));
        }
    }
}