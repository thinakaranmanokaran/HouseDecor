import React from "react";
import { View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

export default function Flower() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={200} height={120} viewBox="0 0 200 200">
        {/* Petals */}
        {[...Array(12)].map((_, i) => (
          <Path
            key={i}
            d="M50,20 C90,-20 110,-20 150,20 C190,60 190,140 150,180 C110,220 90,220 50,180 C10,140 10,60 50,20 Z"
            fill="black" // Solid Black Color (Like in your CSS)
            transform={`rotate(${i * 45} 100 100)`}
          />
        ))}
        {/* Center Circle */}
        <Circle cx={100} cy={100} r={30} fill="black" />
      </Svg>
    </View>
  );
}
