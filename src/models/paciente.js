const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paciente', {
    codigo_persona: {
      type: DataTypes.STRING,
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
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'paciente',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fk_codigo_persona_paciente",
        unique: true,
        fields: [
          { name: "codigo_persona" },
        ]
      },
    ]
  });
};
