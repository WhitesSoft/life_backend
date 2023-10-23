const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('horario', {
    id_horario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: true
    },
    id_odontologo: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'odontologo',
        key: 'codigo_persona'
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'horario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "horario_pkey",
        unique: true,
        fields: [
          { name: "id_horario" },
        ]
      },
    ]
  });
};
