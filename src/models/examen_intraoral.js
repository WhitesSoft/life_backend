const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
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
    },
    codigo_historial: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'historial_clinico',
        key: 'codigo_historial'
      },
      unique: "examen_intraoral_codigo_historial_key"
    }
  }, {
    sequelize,
    tableName: 'examen_intraoral',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "examen_intraoral_codigo_historial_key",
        unique: true,
        fields: [
          { name: "codigo_historial" },
        ]
      },
      {
        name: "examen_intraoral_pkey",
        unique: true,
        fields: [
          { name: "id_examenintraoral" },
        ]
      },
    ]
  });
};
