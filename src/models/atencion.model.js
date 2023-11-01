module.exports = function (sequelize, DataTypes) {
    const Atencion = sequelize.define('atencion', {
        id_atencion: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
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
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
    }, {
        timestamps: false,
    });
    return Atencion
};
