import { View, Text, Image, Pressable } from "react-native";
import "./../../../global.css";
import tw from "./../../../tailwind";
import images from "./../../assets/images";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { jwtDecode } from 'jwt-decode'
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function LandingPage() {

    const navigation = useNavigation();
    const [ currentUser, setCurrentUser ] = useState(false);

    const [fontsLoaded] = useFonts({
        Cabin: require("./../../assets/fonts/cabin/Cabin-Regular.ttf"),
        Switzer: require("./../../assets/fonts/general/GeneralSans-Medium.otf"),
    });

    useEffect(() => {
        async function prepare() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        }
        prepare();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Prevent UI rendering until fonts are loaded
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve the token from storage
                const token = await AsyncStorage.getItem("token");

                if (token) {
                    // Decode the token
                    const decoded = jwtDecode(token);
                    console.log("Decoded JWT:", decoded); // Debugging

                    // Extract the user's name
                    setCurrentUser(decoded);
                } else {
                    console.log("Error", "No token found. Please log in.");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={tw`flex bg-white h-full items-center bg-[#f7faf9]`}>
            {/* Image Section */}
            <View style={tw`h-4/6 w-full flex justify-center items-center`}>
                <Image source={images.LandingGirl} style={tw`w-5/6 h-5/6`} />
            </View>

            {/* Text & Button Section */}
            <View style={tw`h-2/6 w-full px-4 flex items-center justify-center`}>
                <Text style={[tw`text-lg font-cabin`, { fontFamily: "Cabin" }]}>Hello, Dear</Text>
                <Text style={[tw`text-3xl font-cabin mt-1 px-6 text-center`, { fontFamily: "Switzer" }]}>
                    Happy to have you with us!
                </Text>

                {/* Get Started Button */}
                { !currentUser && <Pressable
                    style={tw`bg-red py-3 px-6 rounded-2xl w-11/12 mt-6`}
                    onPress={() => navigation.navigate("SignIn")}
                >
                    <Text style={[tw`text-white text-center text-lg`, { fontFamily: "Cabin" }]}>
                        Register
                    </Text>
                </Pressable>}
                { currentUser && <Pressable
                    style={tw`bg-red py-3 px-6 rounded-2xl w-11/12 mt-6`}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={[tw`text-white text-center text-lg`, { fontFamily: "Cabin" }]}>
                        Get Started
                    </Text>
                </Pressable>}
            </View>
        </View>
    );
}
