module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define("roles", {
        id_rol: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_rol: {
            type: Sequelize.STRING
        }
    },
        { timestamps: false });

    return Rol;
};