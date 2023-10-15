const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historial_clinico', {
    codigo_historial: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    area: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'historial_clinico',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "historial_clinico_pkey",
        unique: true,
        fields: [
          { name: "codigo_historial" },
        ]
      },
    ]
  });
};
