const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('factura', {
    id_factura: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    senor: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    detalle: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_pago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pagos',
        key: 'id_pago'
      },
      unique: "factura_id_pago_key"
    },
    id_secretaria: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'secretaria',
        key: 'codigo_persona'
      }
    }
  }, {
    sequelize,
    tableName: 'factura',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "factura_id_pago_key",
        unique: true,
        fields: [
          { name: "id_pago" },
        ]
      },
      {
        name: "factura_pkey",
        unique: true,
        fields: [
          { name: "id_factura" },
        ]
      },
    ]
  });
};
