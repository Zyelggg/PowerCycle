module.exports = (sequelize, DataTypes) => {
    const Bike = sequelize.define("Bike", {
        stopname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        repairs: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Bike.associate = models => {
        Bike.belongsTo(models.BikeStop, { foreignKey: 'stopname', targetKey: 'stopname' });
        Bike.hasMany(models.User, { foreignKey: 'userId', targetKey: 'id' });
        Bike.belongsTo(models.Ridden, { foreignKey: 'bikeId', targetKey: 'bikeId' })
    };

    return Bike;

}
