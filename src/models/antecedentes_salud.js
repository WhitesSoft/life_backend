const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('antecedentes_salud', {
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
      unique: "antecedentes_salud_codigo_historial_key"
    }
  }, {
    sequelize,
    tableName: 'antecedentes_salud',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "antecedentes_salud_codigo_historial_key",
        unique: true,
        fields: [
          { name: "codigo_historial" },
        ]
      },
      {
        name: "antecedentes_salud_pkey",
        unique: true,
        fields: [
          { name: "id_antecedentes_salud" },
        ]
      },
    ]
  });
};
