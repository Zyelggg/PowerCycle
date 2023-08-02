module.exports = (sequelize, DataTypes) => {
    const Ridden = sequelize.define("Ridden", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mileage: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        electricity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        bikeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    });
    
    // User has many bikes that they have ridden
    Ridden.associate = models => {
        Ridden.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
        Ridden.belongsTo(models.Bike, { foreignKey: 'bikeId', targetKey: 'id' });
    }

    return Ridden;
}
