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
db.asistente = require('../models/asistente_dental.model.js')(sequelize, Sequelize);
db.secretaria = require('../models/secretaria.model.js')(sequelize, Sequelize);
db.paciente = require('../models/paciente.model.js')(sequelize, Sequelize);
db.turno = require('../models/turno.models.js')(sequelize, Sequelize);
db.historial_clinico = require('../models/historial_clinico.model.js')(sequelize, Sequelize);
db.consulta = require('../models/historial_consulta.models')(sequelize, Sequelize);
db.antecedentes_salud = require('../models/historial_antecedentes_salud.js')(sequelize, Sequelize);
db.extra_oral = require('../models/historial_extraoral.js')(sequelize, Sequelize);
db.intra_oral = require('../models/historial_intraoral.js')(sequelize, Sequelize);
db.antecedentes_higuiene = require('../models/historial_antecedentes_higuiene.js')(sequelize, Sequelize);
db.atencion =  require('../models/atencion.model.js')(sequelize, Sequelize);
db.personal = require('../models/personal.model.js')(sequelize, Sequelize);
db.asistencia_personal = require('../models/asistencia_personal.model.js')(sequelize, Sequelize);
db.pagos = require('../models/pagos.model.js')(sequelize, Sequelize);

/* *** RELACIONES *** */

// (Usuario y Roles) MANY_TO_MANY
db.rol.belongsToMany(db.usuario, {
    through: 'usuario_roles',
    foreignKey: 'roleIdRol', // Suponiendo que así se llama la columna en usuario_roles
    otherKey: 'usuarioIdUsuario', // Suponiendo que así se llama la columna en usuario_roles
    onDelete: 'CASCADE'
});
db.usuario.belongsToMany(db.rol, {
    through: 'usuario_roles',
    foreignKey: 'usuarioIdUsuario', // Suponiendo que así se llama la columna en usuario_roles
    otherKey: 'roleIdRol', // Suponiendo que así se llama la columna en usuario_roles
    onDelete: 'CASCADE'
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

// (Usuario y asistente) ONE_TO_ONE 
db.usuario.hasOne(db.asistente, {
    foreignKey: 'id_usuario',
    as: 'asistente'
});
db.asistente.belongsTo(db.usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario', 
    onDelete: 'CASCADE'
});

// (Usuario y secretaria) ONE_TO_ONE 
db.usuario.hasOne(db.secretaria, {
    foreignKey: 'id_usuario',
    as: 'secretaria'
});
db.secretaria.belongsTo(db.usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario', 
    onDelete: 'CASCADE'
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

// (Paciente e HistorialClinico) ONE_TO_ONE
db.paciente.hasOne(db.historial_clinico, {
    foreignKey: 'id_paciente',
    as: 'historial',
    onDelete: 'CASCADE'
});
db.historial_clinico.belongsTo(db.paciente, {
    foreignKey: 'id_paciente',
    as: 'paciente',
    onDelete: 'CASCADE'
});

// (HistorialClinico y consulta) ONE_TO_ONE
db.historial_clinico.hasOne(db.consulta, {
    foreignKey: 'id_historial',
    as: 'consulta',
    onDelete: 'CASCADE'
})
db.consulta.belongsTo(db.historial_clinico, {
    foreignKey: 'id_historial',
    as: 'historial',
})

// (HistorialClinico y antecedentes de salud) ONE_TO_ONE
db.historial_clinico.hasOne(db.antecedentes_salud, {
    foreignKey: 'id_historial',
    as: 'antsalud',
    onDelete: 'CASCADE'
})
db.antecedentes_salud.belongsTo(db.historial_clinico, {
    foreignKey: 'id_historial',
    as: 'historial',
})

// (HistorialClinico y examen extra oral) ONE_TO_ONE
db.historial_clinico.hasOne(db.extra_oral, {
    foreignKey: 'id_historial',
    as: 'extraoral',
    onDelete: 'CASCADE'
})
db.extra_oral.belongsTo(db.historial_clinico, {
    foreignKey: 'id_historial',
    as: 'historial',
})

// (HistorialClinico y examen intra oral) ONE_TO_ONE
db.historial_clinico.hasOne(db.intra_oral, {
    foreignKey: 'id_historial',
    as: 'intraoral',
    onDelete: 'CASCADE'
})
db.intra_oral.belongsTo(db.historial_clinico, {
    foreignKey: 'id_historial',
    as: 'historial',
})

// (HistorialClinico y antecedentes de higueine) ONE_TO_ONE
db.historial_clinico.hasOne(db.antecedentes_higuiene, {
    foreignKey: 'id_historial',
    as: 'anthiguiene',
    onDelete: 'CASCADE'
})
db.antecedentes_higuiene.belongsTo(db.historial_clinico, {
    foreignKey: 'id_historial',
    as: 'historial',
})

// (Turno y Atencion) ONE_TO_ONE
db.turno.hasOne(db.atencion, {
    foreignKey: 'id_turno', 
    as: 'atencion'
})
db.atencion.belongsTo(db.turno, {
    foreignKey: 'id_turno', 
    as: 'turno'
})

// (Personal y asistente) ONE_TO_ONE
db.personal.hasOne(db.asistente, {
    foreignKey: 'id_personal', 
    as: 'asistente',
    onDelete: 'CASCADE'
})
db.asistente.belongsTo(db.personal, {
    foreignKey: 'id_personal', 
    as: 'personal'
})

// (Personal y secretaria) ONE_TO_ONE
db.personal.hasOne(db.secretaria, {
    foreignKey: 'id_personal', 
    as: 'secretaria',
    onDelete: 'CASCADE'
})
db.secretaria.belongsTo(db.personal, {
    foreignKey: 'id_personal', 
    as: 'personal'
})

// (Personal y Asistencia) ONE_TO_MANY
db.personal.hasOne(db.asistencia_personal, {
    foreignKey: 'id_personal', 
    as: 'asistencias'    
})
db.asistencia_personal.belongsTo(db.personal, {
    foreignKey: 'id_personal', 
    as: 'personal'
})

// (Personal y pagos) ONE_TO_MANY
db.personal.hasOne(db.pagos, {
    foreignKey: 'id_personal',
    as: 'pagos'
})
db.pagos.belongsTo(db.personal, {
    foreignKey: 'id_personal',
    as: 'personal'
})

module.exports = db;