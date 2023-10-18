const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reportes', {
    id_reporte: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    total_pagos: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    id_odontologo: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'odontologo',
        key: 'codigo_persona'
      }
    }
  }, {
    sequelize,
    tableName: 'reportes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reportes_pkey",
        unique: true,
        fields: [
          { name: "id_reporte" },
        ]
      },
    ]
  });
};
