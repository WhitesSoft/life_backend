module.exports = function (sequelize, DataTypes) {
    const Proveedor = sequelize.define('proveedor', {
        id_proveedor: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombres: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        apellido_paterno: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        apellido_materno: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: false,
    });
    return Proveedor
};
