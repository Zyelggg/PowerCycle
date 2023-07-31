module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    });

    // User has many bikes that they have ridden
    User.associate = models => {
        User.hasMany(models.Ridden, {foreignKey: 'userId'})
    }

    return User;
}
