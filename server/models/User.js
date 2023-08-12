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
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false  
        },
        // pic: {
        //     type: DataTypes.STRING(20),
        //     allowNull: false,
        //     defaultValue: false  
        // }
    });

    User.associate = models => {
        User.hasMany(models.Ridden, { foreignKey: 'userId' });
        
    }

    return User;
}
