module.exports = (sequelize, DataTypes) => {
    const BikeStop = sequelize.define("BikeStop", {
        imageFile: {
            type: DataTypes.STRING
        },
        
        stopname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        coordx: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        coordy: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    BikeStop.associate = models => {
        // Add foreign key association
        BikeStop.hasMany(models.Bike, { foreignKey: 'stopname' });
    };
    
    return BikeStop;
}
