const db = require('../database/database')
const dbPagos = db.pagos;
const dbPersonal = db.personal;
const dbAtencion = db.atencion;

exports.obtenerPagosConDetalles = async () => {
    try {
        const listaDePagos = await dbPagos.findAll({
            include: [{
                model: dbAtencion,
                as: 'atencion',
                attributes: ['nombre', 'apellido_paterno', 'apellido_materno'],
                // Agrega una condición where para asegurar de que la atención no sea null
                where: {
                    id_atencion: {
                        [db.Sequelize.Op.ne]: null // Op.ne es el operador 'not equal'
                    }
                },
                required: true // Esto asegura que la inclusión de 'atencion' es obligatoria
            }],
            attributes: ['id_pago', 'fecha', 'monto'],
            where: {
                id_atencion: {
                    [db.Sequelize.Op.ne]: null // Asegura que se incluyan solo los pagos con una atención asociada
                }
            },
            raw: true,
            nest: true,
            order: [['fecha', 'DESC']]
        });

        return listaDePagos
    } catch (error) {
        throw error;
    }

}

exports.getById = async (id) => {
    return await dbPagos.findByPk(id);
}