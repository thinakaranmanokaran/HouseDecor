// import React from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import tw from "../../../tailwind";
// import images from "../../assets/images";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import images from "./../../assets/images";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function Home() {

    const navigation = useNavigation();

    const [focused, setFocused] = useState(false)

    const [fontsLoaded] = useFonts({
        Cabin: require("./../../assets/fonts/cabin/Cabin-Regular.ttf"),
        CabinItalic: require("./../../assets/fonts/cabin/Cabin-Italic.ttf"),
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

    const Genre = [
        {
            title: "Technical",
        },
        {
            title: "Aesthetic",
        },
        {
            title: "Decor's",
        },
        {
            title: "Art",
        },
        {
            title: "Photographs",
        },
        {
            title: "Paints",
        },
    ]

    return (
        <View style={[tw`p-3 py-5 bg-black  flex-1 `, { maxHeight: '100vh' }]}>
            <View style={[tw`my-2 mt-6 flex-1`, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", }]}>
                <View style={[tw`p-2 w-fit  rounded-full`, { display: "flex", flexDirection: "row", alignItems: "center" }]}>
                    <Image source={images.LandingGirl} style={tw`h-10 w-10 rounded-full`} />
                    <View style={[tw` ml-2 `, { fontFamily: "Cabin" }]} >
                        <Text style={[tw`text-base text-white `, { fontFamily: "Cabin" }]}>Dheena</Text>
                        <Text style={[tw`text-xs text-white `, { fontFamily: "Cabin" }]}>@dheenahere</Text>
                    </View>
                </View>
                <Text style={tw`text-lg text-black rounded-2xl p-1 px-3 bg-white font-bold mr-2`}>220</Text>
            </View>

            <View style={[tw`w-full  rounded-3xl bg-white p-6  flex-7`, { height: "auto" }]}>
                <View>
                    <Text style={[tw`text-3xl text-black `, { fontFamily: "Cabin" }]}>
                        Find the <Text style={[tw`text-3xl text-red  `, { fontFamily: "CabinItalic" }]} >cute item</Text> for your sweet Home
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`flex-row gap-x-4 py-1 mt-3 `} >
                        {
                            Genre.map((Data, index) => (
                                <Pressable  onPress={() => setFocused(index) } >
                                    <Text style={[tw`text-sm text-white ${ focused === index ? "bg-red text-white" : "bg-[#00000010] text-red" }   px-2 min-w-12 text-center  py-1 rounded-full `, { fontFamily: "Cabin" }]} key={index} >{Data.title}</Text>
                                </Pressable>
                            ))
                        }
                    </ScrollView>


                    <Text style={tw`text-lg text-black font-bold`}></Text>

                </View>
            </View>
        </View>
    );
}
