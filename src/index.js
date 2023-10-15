const express = require('express');
const v1UserRouter = require('./v1/routers/userRouters')
const sequelize  = require('./database/database')

const app = express();
const PORT = process.env.PORT || 8080;

// middleware (funciones que se ejecutan antes de llegar a las rutas)
app.use(express.json()); // Cada vez que me envien desde el cliente un objeto json, el servidor sera capaz de entenderlo
app.use(express.urlencoded({ extended: false })); // Un cliente manda datos de un formulario, el servidor sera capaz de volverlo objeto, el extended false solo hace que permita texto

// rutas
app.use('/api/v1/users', v1UserRouter);

// verificando conexion con la base de datos
//sequelize.dbConnection();

// Ahora escucha nuesto app
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}.....`);
})
