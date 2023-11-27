module.exports = function (sequelize, DataTypes) {
    const Factura = sequelize.define('factura', {
        id_factura: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        senor: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        detalle: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        nit: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        timestamps: false,
    });
    return Factura
};
