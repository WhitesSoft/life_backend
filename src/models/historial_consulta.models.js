module.exports = function(sequelize, DataTypes) {
  const Consulta = sequelize.define('consulta', {
    id_consulta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    motivo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ultima_visita_odontologo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
  }, {
    timestamps: false,
  });
  return Consulta
};
