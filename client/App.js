import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LandingPage, ThreeD } from "./src/components";
import { Camera, Home, Profile, SignIn, SignUp } from "./src/screens";
import { AppProvider } from "./src/context/AppProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LandingPage" component={LandingPage} />

          <Stack.Screen name="ThreeD" component={ThreeD} />

          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
