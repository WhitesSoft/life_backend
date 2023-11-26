module.exports = function (sequelize, DataTypes) {
    const asistencia = sequelize.define('asistencia_personal', {
        id_asistencia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        estado_asistencia: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {

        timestamps: false,
    })
    return asistencia
};
