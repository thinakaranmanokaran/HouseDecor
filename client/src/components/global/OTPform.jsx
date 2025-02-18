import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_API_URL } from "@env";
import tw from "../../../tailwind";

import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";


// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const OTPform = ({ togglePage, email }) => {

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

    const inputsRef = useRef([]);
    const [otpError, setOtpError] = useState("");

    const handleInputChange = (text, index) => {
        if (text.length === 1 && index < 4) {
            inputsRef.current[index + 1]?.focus();
        } else if (text.length === 0 && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otp = inputsRef.current.map((input) => input.value).join("");
        if (otp.length !== 5) {
            setOtpError("Please enter a valid 5-digit OTP.");
            return;
        }

        try {
            const { data } = await axios.post(`${SERVER_API_URL}/api/auth/verify-otp`, {
                email,
                otp,
            });

            if (data.token) {
                await AsyncStorage.setItem("authToken", data.token);
                Alert.alert("Success", "Verification successful! Your account is now active.");
                setOtpError("");
            } else {
                setOtpError(data.message || "Invalid OTP. Try again.");
            }
        } catch (error) {
            setOtpError(error.response?.data?.message || "Error verifying OTP. Please try again.");
        }
    };

    return (
        <View style={tw`flex justify-center items-center w-full max-h-72 min-w-84 rounded-3xl   h-full bg-white px-5`}>
            <Text style={[tw`text-black text-2xl font-bold mb-2`, { fontFamily: "SwitzerBold" }]}>Email Verification</Text>
            <Text style={[tw`text-gray-600 text-center mb-4`, { fontFamily: "Urban" }]}>
                Enter the 5-digit verification code sent to{" "}
                <Text style={tw`text-black font-semibold   underline`}>{email}</Text>
            </Text>

            <View style={tw`flex flex-row gap-2`}>
                {Array(5).fill(0).map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        style={[tw`w-12 h-12 text-center border border-gray-500 rounded-md bg-white bg-opacity-10 text-black text-2xl`, { fontFamily: "SwitzerBold" }]}
                        maxLength={1}
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange(text, index)}
                    />
                ))}
            </View>

            {otpError ? <Text style={tw`text-red-500 mt-2`}>{otpError}</Text> : null}

            <View style={tw`flex flex-row gap-2 mt-4`}>
                <TouchableOpacity onPress={togglePage} style={tw`bg-red py-3 rounded-2xl px-4 `}>
                    <Text style={[tw`text-white font-semibold text-base text-center `, { fontFamily: "SwitzerBold" }]}>Edit Email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleVerify} style={tw`bg-black py-3 rounded-2xl px-7 `}>
                    <Text style={[tw`text-white font-semibold text-base text-center `, { fontFamily: "SwitzerBold" }]}>Verify</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OTPform;
