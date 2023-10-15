const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('atencion', {
    id_atencion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    id_turno: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'turno',
        key: 'id_turno'
      },
      unique: "atencion_id_turno_key"
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
    }
  }, {
    sequelize,
    tableName: 'atencion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "atencion_id_turno_key",
        unique: true,
        fields: [
          { name: "id_turno" },
        ]
      },
      {
        name: "atencion_pkey",
        unique: true,
        fields: [
          { name: "id_atencion" },
        ]
      },
    ]
  });
};
