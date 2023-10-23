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
db.persona = require('../models/persona.model.js')(sequelize, Sequelize);
db.odontologo = require('../models/odontologo.model.js')(sequelize, Sequelize);
db.paciente = require('../models/paciente.model.js')(sequelize, Sequelize);
db.turno = require('../models/turno.models.js')(sequelize, Sequelize);

/* *** RELACIONES *** */

// (Usuario y Roles) MANY_TO_MANY
db.rol.belongsToMany(db.usuario, {
    through: 'usuario_roles'
});
db.usuario.belongsToMany(db.rol, {
    through: 'usuario_roles'
});

// (Usuario y Persona) ONE_TO_ONE
db.usuario.hasOne(db.persona, {
    foreignKey: 'id_usuario',
    as: 'persona'
});
db.persona.belongsTo(db.usuario, {
    foreignKey: 'id_usuario',
    as: 'persona'
});

// (Usuario y Odontologo) ONE_TO_ONE (simulara la herencia)
db.usuario.hasOne(db.odontologo, {
    foreignKey: 'id_usuario',
    as: 'odontologo'
});
db.odontologo.belongsTo(db.usuario, {
    foreignKey: 'id_usuario',
    as: 'odontologo'
});

// (Usuario y Paciente) ONE_TO_ONE (simulara la herencia)
// db.usuario.hasOne(db.paciente, {
//     foreignKey: 'id_usuario',
//     as: 'paciente'
// });
// db.paciente.belongsTo(db.usuario, {
//     foreignKey: 'id_usuario',
//     as: 'paciente'
// });

// (Paciente y turnos) ONE_TO_MANY
db.paciente.hasMany(db.turno, {
    foreignKey: 'id_paciente', 
    as: 'turnos', 
    onDelete: 'CASCADE'
});
db.turno.belongsTo(db.paciente, {
    foreignKey: 'id_paciente', 
    as: 'paciente'
});


module.exports = db;