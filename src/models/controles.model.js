module.exports = function (sequelize, DataTypes) {
    const Control = sequelize.define('controles', {
        id_control: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        detalle: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    }, {
        timestamps: false,
    });
    return Control
};
