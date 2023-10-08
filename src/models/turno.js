const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('turno', {
    id_turno: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    apellido_paterno: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    apellido_materno: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: true
    },
    motivo: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'turno',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "turno_pkey",
        unique: true,
        fields: [
          { name: "id_turno" },
        ]
      },
    ]
  });
};
