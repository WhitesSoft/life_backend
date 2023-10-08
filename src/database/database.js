const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('life', 'postgres', '1234', {
    host: 'localhost', 
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

module.exports = { sq: sequelize, dbConnection };