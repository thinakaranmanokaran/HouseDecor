// import { StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { GLView } from "expo-gl"; // Required for WebGL in React Native
// import { useGLTF } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber/native"; // Use `native` for React Native compatibility
// import { OrbitControls } from "@react-three/drei";
// import { Asset } from "expo-asset";

// const Model = () => {
//   const { scene } = useGLTF(Asset.fromModule(require("../../assets/models/basketball.glb")).uri);
//   return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
// };

// const ThreeD = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <Text>ThreeD</Text>
//       <GLView
//         style={{ flex: 1 }}
//         onContextCreate={(gl) => {
//           gl.createRenderbuffer(); // Initialize WebGL context
//         }}
//       >
//         {/* <Canvas> */}
//           <ambientLight />
//           <Model />
//           <OrbitControls />
//         {/* </Canvas> */}
//       </GLView>
//     </View>
//   );
// };

// export default ThreeD;

// const styles = StyleSheet.create({});


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ThreeD = () => {
  return (
    <View>
      <Text>ThreeD</Text>
    </View>
  )
}

export default ThreeD

const styles = StyleSheet.create({})