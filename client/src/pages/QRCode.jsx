import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './styles/Home.css';
import { useNavigate } from 'react-router-dom';

function QRCode() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const html5QrCodeScanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 30,
    });

    function success(result) {
      html5QrCodeScanner.clear();
      setScanResult(result);

      // Redirect to the new page after scanning the QR code
      navigate(`/ridingbike?qrCode=${result}`);
    }

    function error(err) {
      console.warn(err);
    }

    html5QrCodeScanner.render(success, error);

    // Clean up the scanner when the component unmounts
    return () => html5QrCodeScanner.clear();
  }, [navigate]);

  return (
    <div>
      <div className="App">
        <h1>QR Code Reader</h1>
        {scanResult ? <div><h1>Success</h1></div> : <div id="qr-reader"></div>}
      </div>
    </div>
  );
}

export default QRCode;
