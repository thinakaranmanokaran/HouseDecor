import { View, Text, Image } from "react-native";
import "./global.css";
import tw from "./tailwind";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import images from "./src/assets/images";
import { Flower } from "./src/components";

export default function App() {
    const [fontsLoaded] = useFonts({
        Cabin: require("./src/assets/fonts/cabin/Cabin-Regular.ttf"),
        Switzer: require("./src/assets/fonts/general/GeneralSans-Medium.otf"),
    });

    useEffect(() => {
        async function hideSplashScreen() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        }
        hideSplashScreen();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Return nothing until fonts are loaded
    }

    return (
        <View style={tw` flex bg-white h-full items-center  bg-[#f7faf9] `}>
            <View style={tw`h-4/6  w-full flex justify-center items-center `} >
                <Image source={images.LandingGirl} style={tw`w-5/6 h-5/6 `} />
            </View>
            {/* <Flower /> */}
            <View style={tw` h-full w-full pt-0  px-4 -mt-0 flex items-center    `} >
                <Text style={[ tw`text-lg  font-cabin  `, { fontFamily: "Cabin" }, ]} > Hello, Dheena</Text>
                <Text style={[ tw`text-3xl  font-cabin mt-1 px-6 text-center  `, { fontFamily: "Switzer" }, ]} > Happy to have you with us! </Text>
                <Text style={[tw`bg-red text-white  py-3 text-center mt-6 rounded-2xl text-lg w-full `, { fontFamily: 'Cabin' }]} >Get Started</Text>
            </View>
        </View>
    );
}
