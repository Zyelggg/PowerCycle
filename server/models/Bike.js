const generateQRCode = require('../routes/generateQRCode');
module.exports = (sequelize, DataTypes) => {
    const Bike = sequelize.define("Bike", {
        qrcode: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        serialno: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
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
    };


  // Generate QR code before saving the bike record to the database
    Bike.beforeCreate(async (bike) => {
    try {
        const jsonData = JSON.stringify({
            
            serialno: bike.serialno,             // Add the 'id' property to the JSON data
            stopname: bike.stopname,
            repairs: bike.repairs
      });

        // Generate the QR code image URL
        const imageUrl = await generateQRCode(jsonData);

        // Set the QR code image URL in the bike record
        bike.qrcode = imageUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
    });

    return Bike;

}
