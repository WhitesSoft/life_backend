const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personal', {
    id_personal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nombres: {
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
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    telefono: {
      type: DataTypes.INTEGER,
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
    correo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asistencia: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'personal',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "personal_pkey",
        unique: true,
        fields: [
          { name: "id_personal" },
        ]
      },
    ]
  });
};
