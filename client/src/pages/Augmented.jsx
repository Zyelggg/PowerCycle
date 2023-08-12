import React from 'react';
import 'aframe';
import 'aframe-ar';
// import bikeModel from "../assets/scene.gltf"; 

function Augmented() {
  return (
    <div></div>
    // <a-scene arjs='sourceType: webcam;'>
    //   {/* Place your AR model */}
    //   <a-entity
    //     gps-entity-place={`latitude: ${targetLatitude}; longitude: ${targetLongitude};`}
    //   >
    //     <a-gltf-model src={bikeModel} scale="0.1 0.1 0.1"></a-gltf-model>
    //   </a-entity>
    // </a-scene>
  );
}

export default Augmented;
