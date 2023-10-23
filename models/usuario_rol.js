const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario_rol', {
    id_usuario_rol: {
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
      }
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rol',
        key: 'id_rol'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario_rol',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuario_rol_pkey",
        unique: true,
        fields: [
          { name: "id_usuario_rol" },
        ]
      },
    ]
  });
};
