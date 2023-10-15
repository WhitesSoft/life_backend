const Sequelize = require('sequelize');
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
    },
    codigo_historial: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'historial_clinico',
        key: 'codigo_historial'
      },
      unique: "antecedentes_higuiene_oral_codigo_historial_key"
    }
  }, {
    sequelize,
    tableName: 'antecedentes_higuiene_oral',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "antecedentes_higuiene_oral_codigo_historial_key",
        unique: true,
        fields: [
          { name: "codigo_historial" },
        ]
      },
      {
        name: "antecedentes_higuiene_oral_pkey",
        unique: true,
        fields: [
          { name: "id_antecedentes_higuiene" },
        ]
      },
    ]
  });
};
