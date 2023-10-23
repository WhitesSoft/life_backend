const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    correo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    usuario: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_persona: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'persona',
        key: 'codigo_persona'
      },
      unique: "usuario_id_persona_key"
    }
  }, {
    sequelize,
    tableName: 'usuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuario_id_persona_key",
        unique: true,
        fields: [
          { name: "id_persona" },
        ]
      },
      {
        name: "usuario_pkey",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
