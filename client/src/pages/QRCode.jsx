import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './styles/Home.css';

function QRCode() {
  const videoRef = useRef(null);

  useEffect(() => {
    const html5QrCodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 30, qrbox: 250 },
      (qrCode) => {
        console.log('QR Code:', qrCode);
        // Do something with the decoded QR code here
        navigate('/ridingbike');
      }
    );

    html5QrCodeScanner.render();

    // Clean up the scanner when the component unmounts
    return () => html5QrCodeScanner.clear();

  }, []);

  return (
    <div>
      
      <div className="App">
        <h1>QR Code Reader</h1>
        <div id="qr-reader" ref={videoRef}></div>

      </div>
      
      
    </div>
  );
}

export default QRCode;
