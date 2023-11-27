const express = require('express');
const cors = require('cors');
const v1UserRouter = require('./v1/routers/userRouters');
const v1AuthRouter = require('./v1/routers/authRouters');
const v1PacienteRouter = require('./v1/routers/pacienteRouters');
const v1TurnoRouter = require('./v1/routers/turnoRouters');
const v1HistorialRouter = require('./v1/routers/historialRouters');
const v1HistorialConsultaRouter = require('./v1/routers/historial_consultaRouters');
const v1HistorialAntecedenteSaludRouter = require('./v1/routers/historial_antecedente_saludRouters');
const v1HistorialExtraoralRouter = require('./v1/routers/historial_extraoralRouters');
const v1HistorialIntraoralRouter = require('./v1/routers/historial_intraoralRouters');
const v1HistorialAntecedenteHiguieneRouter = require('./v1/routers/historial_antecedente_higuieneRouters');
const v1ControlesRouter = require('./v1/routers/controlRouters');
const v1AtencionRouter = require('./v1/routers/atencionRouters');
const v1PersonalRouter = require('./v1/routers/personalRouters');
const v1PagosRouter = require('./v1/routers/pagosRouters');
const v1FacturaRouter = require('./v1/routers/facturaRouters');
const db = require('./database/database');
const Rol = db.rol;

// configurar el cors

// var corsOptions = {
//     origin: "http://localhost:4200"
//   };
  
//   app.use(cors(corsOptions));

const app = express();
const PORT = process.env.PORT || 3000;

// middleware (funciones que se ejecutan antes de llegar a las rutas)
//app.use(corsOptions);
app.use(express.json()); // Cada vez que me envien desde el cliente un objeto json, el servidor sera capaz de entenderlo
app.use(express.urlencoded({ extended: true })); // Un cliente manda datos de un formulario, el servidor sera capaz de volverlo objeto, el extended false solo hace que permita texto

// rutas
app.use('/api/v1', v1UserRouter);
app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/paciente', v1PacienteRouter);
app.use('/api/v1/turno', v1TurnoRouter);
app.use('/api/v1/historial', v1HistorialRouter);
app.use('/api/v1/consulta', v1HistorialConsultaRouter);
app.use('/api/v1/asalud', v1HistorialAntecedenteSaludRouter);
app.use('/api/v1/extraoral', v1HistorialExtraoralRouter);
app.use('/api/v1/intraoral', v1HistorialIntraoralRouter);
app.use('/api/v1/ahiguiene', v1HistorialAntecedenteHiguieneRouter);
app.use('/api/v1/controles', v1ControlesRouter)
app.use('/api/v1/atencion', v1AtencionRouter);
app.use('/api/v1/personal', v1PersonalRouter);
app.use('/api/v1/pagos', v1PagosRouter);
app.use('/api/v1/factura', v1FacturaRouter);


// sincronizacion con la base de datos
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     initial(); // crea lo roles
// });

// Creamos por primera vez los roles
function initial() {
    Rol.create({
        id: 1,
        nombre_rol: "administrador"
    });

    Rol.create({
        id: 2,
        nombre_rol: "asistente"
    });

    Rol.create({
        id: 3,
        nombre_rol: "secretaria"
    });

    Rol.create({
        id: 4,
        nombre_rol: "paciente"
    });
}

// Ahora escucha nuesto app
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}.....`);
})
