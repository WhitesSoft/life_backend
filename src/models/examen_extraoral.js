const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
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
      type: DataTypes.STRING(20),
      allowNull: true
    },
    otros: {
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
      unique: "examen_extraoral_codigo_historial_key"
    }
  }, {
    sequelize,
    tableName: 'examen_extraoral',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "examen_extraoral_codigo_historial_key",
        unique: true,
        fields: [
          { name: "codigo_historial" },
        ]
      },
      {
        name: "examen_extraoral_pkey",
        unique: true,
        fields: [
          { name: "id_examenextraoral" },
        ]
      },
    ]
  });
};
