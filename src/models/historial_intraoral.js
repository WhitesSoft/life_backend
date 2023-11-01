module.exports = function (sequelize, DataTypes) {
    return sequelize.define('examen_intraoral', {
        id_examenintraoral: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        lengua: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        paladar: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        piso_boca: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        mucosa_yugal: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        encias: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        protesis: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: false,
    });
};
