module.exports = (sequelize, DataTypes) => {
    const Turno = sequelize.define('turno', {
        id_turno: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
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
        hora: {
            type: DataTypes.TIME,
            allowNull: true
        },
        motivo: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    },
        {
            timestamps: false
        });
    return Turno;
};
