module.exports = function (sequelize, DataTypes) {
    const Horario = sequelize.define('horarios', {
        id_horario: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: true
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: false,
    });
    return Horario
};
