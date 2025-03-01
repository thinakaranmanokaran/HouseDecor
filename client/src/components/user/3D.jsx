import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native"; // Correct Native import
import { useGLTF } from "@react-three/drei";

const ThreeD = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>3D Model Viewer</Text>
      <Canvas style={{ flex: 1 }}>
        <Scene />
      </Canvas>
    </View>
  );
};

const Scene = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("https://raw.githubusercontent.com/google/filament/main/third_party/models/DamagedHelmet/DamagedHelmet.glb");

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Rotate the model
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -1, 0]} />
    </>
  );
};

export default ThreeD;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
