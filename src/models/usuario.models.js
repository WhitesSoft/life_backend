module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    id_usuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    usuario: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    correo: {
      type: Sequelize.STRING
    }
  }
    ,
    { timestamps: false });

  return Usuario;
};




