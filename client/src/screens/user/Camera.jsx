import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      {/* Camera occupies only half of the screen */}
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}></Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Rest of the screen content */}
      <View style={styles.bottomContainer}>
        <Text style={styles.infoText}>Camera is active on half of the screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffffff",
    margin: 10, // Adds a white margin effect
    marginTop: 35,
  },
  camera: {
    flex: 0.9, // Takes up half the screen
    borderRadius: 25, // Optional: adds rounded corners for a better look
    overflow: "hidden", // Ensures rounded corners work
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    border: "20px white ",
    borderRadius: '50%',
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  bottomContainer: {
    flex: 0.5, // Takes the remaining half of the screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 15, // Optional: matches the camera view
    overflow: "hidden",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
});
