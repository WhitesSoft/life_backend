const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacion', {
    id_notificacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cuerpo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    token_paciente: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_secretaria: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'secretaria',
        key: 'codigo_persona'
      }
    }
  }, {
    sequelize,
    tableName: 'notificacion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notificacion_pkey",
        unique: true,
        fields: [
          { name: "id_notificacion" },
        ]
      },
    ]
  });
};
