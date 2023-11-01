module.exports = function (sequelize, DataTypes) {
    const Antecedentes = sequelize.define('antecedentes_salud', {
        id_antecedentes_salud: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        alergias: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        antecedentes: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

    }, {
        timestamps: false,
    });
    return Antecedentes
};
