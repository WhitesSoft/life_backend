module.exports = function (sequelize, DataTypes) {
    const Paciente = sequelize.define('paciente', {
        id_paciente: {
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
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        genero: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: false,   
    });

    return Paciente;
};
