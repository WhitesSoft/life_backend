const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datos_personales', {
    id_datos_personales: {
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
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sexo: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nivel_educacion: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    profesion: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    estado_civil: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigo_historial: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'historial_clinico',
        key: 'codigo_historial'
      },
      unique: "datos_personales_codigo_historial_key"
    }
  }, {
    sequelize,
    tableName: 'datos_personales',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "datos_personales_codigo_historial_key",
        unique: true,
        fields: [
          { name: "codigo_historial" },
        ]
      },
      {
        name: "datos_personales_pkey",
        unique: true,
        fields: [
          { name: "id_datos_personales" },
        ]
      },
    ]
  });
};
