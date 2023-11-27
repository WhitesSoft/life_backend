module.exports = function (sequelize, DataTypes) {
    const Notificacion = sequelize.define('notificacions', {
        id_notificacion: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        cuerpo: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        titulo: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        token_paciente: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {

        timestamps: false,

    });
    return Notificacion
};
