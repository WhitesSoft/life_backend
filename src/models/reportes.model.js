module.exports = function(sequelize, DataTypes) {
  const Reporte = sequelize.define('reportes', {
    id_reporte: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    total_pagos: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    timestamps: false,
  });

  return Reporte
};
