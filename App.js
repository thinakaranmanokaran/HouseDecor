import { View, Text } from "react-native";
import './global.css'
import tw from 'twrnc';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={tw`text-3xl text-black dark:text-white   `} >Universal React with Expo</Text>
    </View>
  );
}
