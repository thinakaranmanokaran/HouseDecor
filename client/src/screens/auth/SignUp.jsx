import { Image, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import images from '../../assets/images'
import tw from '../../../tailwind'
import { Video } from "expo-av";

import { useEffect } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const Register = () => {

    const [input, setInput] = useState(null);
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Cabin: require("./../../assets/fonts/cabin/Cabin-Regular.ttf"),
        Switzer: require("./../../assets/fonts/general/GeneralSans-Medium.otf"),
        SwitzerBold: require("./../../assets/fonts/general/GeneralSans-Semibold.otf"),
        Urban: require("./../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
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
        <View style={tw` flex justify-center items-center w-full h-full   `} >
            <Image source={images.Scooty} style={tw` h-full top-0 w-full  absolute  `} />
            <View style={tw`w-full  flex justify-center items-center px-4    `} >
                <View style={tw`w-full bg-white flex justify-center gap-y-6 rounded-3xl  items-center py-12 px-4 `} >
                    <Text style={[tw`  text-4xl `, { fontFamily: "SwitzerBold" }]} >Register</Text>
                    <View style={tw`w-full gap-y-2`} >
                        <View style={tw` w-full relative flex justify-center  `} >
                            <TextInput value={emailText} onChangeText={setEmailText} keyboardType='email-address' style={[tw` border-[1px] rounded-xl border-black w-full  ${input === "email" || emailText ? "pt-6 pl-3 text-lg " : ""}`, { fontFamily: "Urban" }]} onFocus={(() => setInput("email"))} onBlur={() => { if (!emailText) setInput(null); }} />
                            <Text style={[tw` absolute   ${input === "email" || emailText ? "top-1 left-2 text-sm " : "left-3 text-base "} `, { fontFamily: "Switzer" }]} >Email</Text>
                        </View>
                        <View style={tw` w-full relative flex justify-center  `} >
                            <TextInput value={emailText} onChangeText={setEmailText} keyboardType='email-address' style={[tw` border-[1px] rounded-xl border-black w-full  ${input === "email" || emailText ? "pt-6 pl-3 text-lg " : ""}`, { fontFamily: "Urban" }]} onFocus={(() => setInput("email"))} onBlur={() => { if (!emailText) setInput(null); }} />
                            <Text style={[tw` absolute   ${input === "email" || emailText ? "top-1 left-2 text-sm " : "left-3 text-base "} `, { fontFamily: "Switzer" }]} >Email</Text>
                        </View>
                        <View style={tw` w-full relative flex justify-center  `} >
                            <TextInput value={passwordText} onChangeText={setPasswordText} keyboardType='visible-password' style={[tw` border-[1px] rounded-xl border-black w-full  ${input === "password" || passwordText ? "pt-6 pl-3 text-lg " : ""}`, { fontFamily: "Urban" }]} onFocus={(() => setInput("password"))} onBlur={() => { if (!passwordText) setInput(null); }} />
                            <Text style={[tw` absolute   ${input === "password" || passwordText ? "top-1 left-2 text-sm " : "left-3 text-base "} `, { fontFamily: "Switzer" }]} >Password</Text>
                        </View>
                        {/* <View style={tw` w-full relative flex justify-center  `} >
                    <TextInput style={[tw` border-[1px] rounded-xl border-black w-full  ${input === "password" ? "pt-6 pl-3 text-lg " : ""} `, { fontFamily: "Urban" }]} onFocus={(() => setInput("password"))} onBlur={() => setInput(null)} />
                    <Text style={[tw` absolute   ${input === "password" ? "top-1 left-2 text-sm " : "left-3 text-base "} `, { fontFamily: "Switzer" }]} >password</Text>
                </View> */}
                        <Pressable style={tw`flex justify-center bg-black py-4 rounded-2xl  `} >
                            <Text style={[tw`text-white text-center text-base`, { fontFamily: "SwitzerBold" }]} >Verify</Text>
                        </Pressable>
                        <Pressable style={tw`flex items-end w-full   `} onPress={() => navigation.navigate("SignIn")} >
                            <Text style={[tw`text-end mr-2 underline text-sm`, { fontFamily: "Switzer" }]} >Already have an Account ?</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({})