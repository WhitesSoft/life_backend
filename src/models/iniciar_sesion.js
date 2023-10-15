const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('iniciar_sesion', {
    id_sesion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      unique: "iniciar_sesion_id_usuario_key"
    },
    usuario: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'iniciar_sesion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "iniciar_sesion_id_usuario_key",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "iniciar_sesion_pkey",
        unique: true,
        fields: [
          { name: "id_sesion" },
        ]
      },
    ]
  });
};
