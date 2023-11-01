module.exports = function (sequelize, DataTypes) {
    return sequelize.define('examen_extraoral', {
        id_examenextraoral: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        atm: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        ganglios_linfaticos: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        respirador: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        labios: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        habitos: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        otros: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        timestamps: false,
    });
};
