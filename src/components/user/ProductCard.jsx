import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import images from '../../assets/images'
import tw from '../../../tailwind'
import * as SplashScreen from "expo-splash-screen";
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ Products }) => {

    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Cabin: require("./../../assets/fonts/cabin/Cabin-Regular.ttf"),
        CabinBold: require("./../../assets/fonts/cabin/Cabin-Bold.ttf"),
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

    return (
        <View style={tw` flex-1 flex-row flex-wrap gap-4 justify-center  `} >
            {
                Products.map((Data, index) => (
                    <View style={tw`w-full max-w-40 rounded-2xl bg-${Data.color}  p-2  `} key={index} >
                        <Image source={Data.img} style={tw`w-full h-32 rounded-2xl `} />
                        <Pressable style={[tw` bg-white px-2 py-1  rounded-xl justify-between items-center `, { display: "flex", flexDirection: "row", }]} onPress={() => navigation.navigate("Camera")} >
                            <View>
                                <Text style={[tw` text-sm  `, { fontFamily: "CabinBold", }]} >{Data.title}</Text>
                                <Text style={[tw`text-xs leading-[14px] text-black opacity-50 `, { fontFamily: "Cabin", }]} >{Data.category}</Text>
                            </View>
                            <Pressable style={tw` bg-black w-fit rounded-md  `}  >
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                            </Pressable>
                        </Pressable>
                    </View>
                ))
            }
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({})