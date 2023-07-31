import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRCode() {
  const videoRef = useRef(null);

  useEffect(() => {
    const html5QrCodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: 250 },
      (qrCode) => {
        console.log('QR Code:', qrCode);
        // Do something with the decoded QR code here
      }
    );

    html5QrCodeScanner.render();


  }, []);

  return (
    <div className="App">
      <h1>QR Code Reader</h1>
      <div id="qr-reader" ref={videoRef}></div>
      
    </div>
  );
}

export default QRCode;
