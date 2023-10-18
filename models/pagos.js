const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pagos', {
    id_pago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    motivo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    total: {
      type: DataTypes.DOUBLE,
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
    id_secretaria: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'secretaria',
        key: 'codigo_persona'
      }
    },
    id_paciente: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'paciente',
        key: 'codigo_persona'
      }
    },
    id_control: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'controles',
        key: 'id_control'
      },
      unique: "unico_id_control"
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_personal: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'personal',
        key: 'id_personal'
      }
    }
  }, {
    sequelize,
    tableName: 'pagos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pagos_pkey",
        unique: true,
        fields: [
          { name: "id_pago" },
        ]
      },
      {
        name: "unico_id_control",
        unique: true,
        fields: [
          { name: "id_control" },
        ]
      },
    ]
  });
};
