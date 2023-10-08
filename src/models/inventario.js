const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventario', {
    id_inventario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    material: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_odontologo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'odontologo',
        key: 'codigo_persona'
      }
    },
    id_asistentedental: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'asistentedental',
        key: 'codigo_persona'
      }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'inventario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "inventario_pkey",
        unique: true,
        fields: [
          { name: "id_inventario" },
        ]
      },
    ]
  });
};
