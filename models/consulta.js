const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consulta', {
    id_consulta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    motivo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ultima_visita_odontologo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    codigo_historial: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'historial_clinico',
        key: 'codigo_historial'
      },
      unique: "consulta_codigo_historial_key"
    }
  }, {
    sequelize,
    tableName: 'consulta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "consulta_codigo_historial_key",
        unique: true,
        fields: [
          { name: "codigo_historial" },
        ]
      },
      {
        name: "consulta_pkey",
        unique: true,
        fields: [
          { name: "id_consulta" },
        ]
      },
    ]
  });
};
