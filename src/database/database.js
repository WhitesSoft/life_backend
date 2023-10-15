require('dotenv').config();
const Sequelize  = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, 
    dialect: 'postgres'
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ROLES = ["administrador", "asistente", "secretaria", "paciente"];

// llamamos a nuestras entidades
db.usuario = require('../models/usuario.models.js')(sequelize, Sequelize);
db.rol = require('../models/rol.models.js')(sequelize, Sequelize);

// relaciones
db.rol.belongsToMany(db.usuario, {
    through: "usuario_roles"
});
db.usuario.belongsToMany(db.rol, {
    through: "usuario_roles"
});




module.exports = db;