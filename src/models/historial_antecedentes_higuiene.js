module.exports = function (sequelize, DataTypes) {
    return sequelize.define('antecedentes_higuiene_oral', {
        id_antecedentes_higuiene: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        usa_cepillo_dental: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        usa_hilo_dental: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        usa_enjuague_bucal: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        frecuencia_cepillado_dental: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        sangran_encias: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        higuiene_bucal: {
            type: DataTypes.STRING(20),
            allowNull: true
        }
    }, {
        timestamps: false,
    });
};
