module.exports = function (sequelize, DataTypes) {
    const pagos = sequelize.define('pagos', {
        id_pago: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        motivo: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        monto: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
    }, {
        timestamps: false,
    });
    return pagos
};
