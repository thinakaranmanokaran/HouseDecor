import { Image, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import images from '../../assets/images'
import tw from '../../../tailwind'
import { Video } from "expo-av";
import axios from "axios";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { SERVER_API_URL } from "@env";
import { OTPform } from '../../components';
import { Dimensions } from "react-native";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const SignIn = () => {

    const [input, setInput] = useState(null);
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [showOTPForm, setShowOTPForm] = useState("");
    const [passwordStatus, setPasswordStatus] = useState(false)

    const screenWidth = Dimensions.get("window").width;
    // console.log("Loaded API URL:", SERVER_API_URL);

    function togglePassword() {
        setPasswordStatus(!passwordStatus)
    }

    function toggleOTPForm() {
        setShowOTPForm(!showOTPForm);
    }

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

    const handleVerifyEmail = async () => {
        if (!emailText) {
            alert("Please enter an email");
            return;
        }
    
        console.log("Making request to:", `${SERVER_API_URL}/api/users/check-email`);
    
        try {
            const response = await axios.post(`${SERVER_API_URL}/api/users/check-email`, {
                email: emailText,
            });
    
            console.log("Response data:", response.data);
            alert("Email exists! Proceeding...");
            togglePassword();
        } catch (error) {
            console.error("Error:", error.message);
            alert("Error verifying email. Please try again later.");
        }
    };

    const handleSignIn = async () => {
        if (!passwordText) {
            alert("Please enter a password");
            return;
        }

        try {
            const response = await fetch(`${SERVER_API_URL}/api/users/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailText, password: passwordText }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Sign-in successful!");
                // Navigate to Home or Dashboard
                navigation.navigate("Home");
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            alert("Error signing in. Please try again.");
        }
    };




    return (
        <View style={tw` flex justify-center ${ showOTPForm ? "items-end" : " items-start " } w-full h-full   `} >
            <Image source={images.Scooty} style={tw` h-full top-0 w-full  absolute ] `} />
            <View style={tw` flex-1 justify-evenly items-center px-4 flex-row     `} >
                <View style={tw`w-full bg-white flex justify-center gap-y-6 rounded-3xl   items-center py-12 px-4 `} >
                    <Text style={[tw`  text-4xl `, { fontFamily: "SwitzerBold" }]} >Verification</Text>
                    <View style={tw`w-full gap-y-2`} >
                        <View style={tw` w-full relative flex justify-center  `} >
                            <TextInput value={emailText} onChangeText={setEmailText} keyboardType='email-address' style={[tw` border-[1px] rounded-xl border-black w-full  ${input === "email" || emailText ? "pt-6 pl-3 text-lg " : ""}`, { fontFamily: "Urban" }]} onFocus={(() => setInput("email"))} onBlur={() => { if (!emailText) setInput(null); }} />
                            <Text style={[tw` absolute   ${input === "email" || emailText ? "top-1 left-2 text-sm " : "left-3 text-base "} `, { fontFamily: "Switzer" }]} >Email</Text>
                        </View>

                        {
                            passwordStatus &&
                            <View style={tw` w-full relative flex justify-center  `} >
                                <TextInput value={passwordText} onChangeText={setPasswordText} secureTextEntry keyboardType='visible-password' style={[tw` border-[1px] rounded-xl border-black w-full  ${input === "password" || passwordText ? "pt-6 pl-3 text-lg " : ""}`, { fontFamily: "Urban" }]} onFocus={(() => setInput("password"))} onBlur={() => { if (!passwordText) setInput(null); }} />
                                <Text style={[tw` absolute   ${input === "password" || passwordText ? "top-1 left-2 text-sm " : "left-3 text-base "} `, { fontFamily: "Switzer" }]} >Password</Text>
                            </View>
                        }
                        {!passwordStatus && <Pressable onPress={handleVerifyEmail} style={tw`flex justify-center bg-black py-4 rounded-2xl  `} >
                            <Text style={[tw`text-white text-center text-base`, { fontFamily: "SwitzerBold" }]} >Verify</Text>
                        </Pressable>}
                        {passwordStatus && <Pressable onPress={handleSignIn} style={tw`flex justify-center bg-black py-4 rounded-2xl  `} >
                            <Text style={[tw`text-white text-center text-base`, { fontFamily: "SwitzerBold" }]} >SignIn</Text>
                        </Pressable>}
                    </View>
                </View>
                <View style={tw` ml-10 mr-2`} >
                    <OTPform togglePage={() => toggleOTPForm(false)} email={emailText} />
                </View>
            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({})