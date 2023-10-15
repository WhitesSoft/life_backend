const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('controles', {
    id_control: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: "unique_id_control"
    },
    detalle: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    codigo_historial: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'historial_clinico',
        key: 'codigo_historial'
      }
    }
  }, {
    sequelize,
    tableName: 'controles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "controles_pkey",
        unique: true,
        fields: [
          { name: "id_control" },
        ]
      },
      {
        name: "unique_id_control",
        unique: true,
        fields: [
          { name: "id_control" },
        ]
      },
    ]
  });
};
