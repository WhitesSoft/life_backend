module.exports = function (sequelize, DataTypes) {
    const HistorialClinico = sequelize.define('historial_clinico', {
        id_historial: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        direccion: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        sexo: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        edad: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        estado_civil: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        ciudad: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        pais: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        nivel_educacion: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        profesion: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        fecha_creacion: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: false,
    });
    return HistorialClinico
};
