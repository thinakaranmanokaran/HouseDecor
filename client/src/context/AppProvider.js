import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { jwtDecode } from "jwt-decode";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Create Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [fontsLoaded] = useFonts({
        Cabin: require("./../assets/fonts/cabin/Cabin-Regular.ttf"),
        Switzer: require("./../assets/fonts/general/GeneralSans-Medium.otf"),
        Urban: require("./../assets/fonts/Urbanist-VariableFont_wght.ttf"),
    });

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Hide splash screen only when fonts are loaded
                if (fontsLoaded) {
                    await SplashScreen.hideAsync();
                }

                // Fetch token once when app starts
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    const decoded = jwtDecode(token);
                    setCurrentUser(decoded);
                }

                if(!token){
                    NavigationPreloadManager.navigate("LandingPage");
                }
            } catch (error) {
                console.error("Error initializing app:", error);
            }
        };

        initializeApp();
    }, [fontsLoaded]); // Runs only when fonts are loaded

    if (!fontsLoaded) return null; // Prevent UI rendering until fonts load

    return (
        <AppContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AppContext.Provider>
    );
};
