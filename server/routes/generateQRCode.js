// generateQRCode.js
const qr = require('qrcode');

const generateQRCode = (jsonData) => {
    return new Promise((resolve, reject) => {
        qr.toDataURL(jsonData, (err, url) => {
            if (err) {
                reject(err);

            } else {
                resolve(url);
            }
        });
    });
};

module.exports = generateQRCode;
