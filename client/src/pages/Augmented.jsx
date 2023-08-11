import React, { useEffect, useState } from 'react';
import 'aframe';
import 'aframe-ar';
import image from "../assets/pencil.png";
import { Box, Text, Scene, MarkerCamera } from "react-aframe-ar";

function Augmented() {
    const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    return (
        <div>


            
            <h1>Augmented reality</h1>

            <a-scene embedded arjs="sourceType: webcam;">
                <a-marker>
                    <a-box position="0 0.5 0" material="opacity: 0.5;"></a-box>
                    <a-marker-camera
                        preset="custom"
                        type="pattern"
                        url="patterns/mypattern.patt"
                    ></a-marker-camera>
                    <a-entity myobject></a-entity>
                </a-marker>
            </a-scene>
        </div>
    );
}

export default Augmented;
