import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from './../../../tailwind';
import { AppContext } from '../../context/AppProvider';
import images from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetStack } from "../../utils/navigationService"; // ✅ Import reset function
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
    const navigation = useNavigation();

    const [currentUser, setCurrentUser] = useState(null);
    // const [fontsLoaded] = useFonts({
    //     Cabin: require("./../assets/fonts/cabin/Cabin-Regular.ttf"),
    //     Switzer: require("./../assets/fonts/general/GeneralSans-Medium.otf"),
    //     Urban: require("./../assets/fonts/Urbanist-VariableFont_wght.ttf"),
    // });

useEffect(() => {
    const initializeApp = async () => {
        try {
            // Hide splash screen only when fonts are loaded
            // if (fontsLoaded) {
            //     await SplashScreen.hideAsync();
            // }

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
}, []); // Runs only when fonts are loaded

    async function LogOut() {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("currentUser");
    
            setCurrentUser(null); // Update global state
            resetStack("LandingPage"); // ✅ Navigate correctly
        } catch (error) {
            console.error("Error removing token:", error);
        }
    }
    


    
    

    return (
        <View style={tw`flex-1 items-center justify-center bg-black`}>
            <Text>Profile</Text>
            <View style={tw`flex items-center`}>
                <Image source={images.LandingGirl} style={tw`h-60 w-60 rounded-full`} />
                <Text style={[tw`text-white text-4xl mt-6`, { fontFamily: "CabinBold" }]}>{ currentUser ? currentUser.name : "John" }</Text>
                <Text style={[tw`text-white text-xl`, { fontFamily: "Urban" }]}>{ currentUser ? currentUser.email : "johndoe@gmail.com" }</Text>
                <Pressable style={tw`w-full`} onPress={LogOut}>
                    <Text style={[tw`bg-red px-16 py-2 text-xl rounded-2xl mt-6 w-full`, { fontFamily: "Cabin" }]}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({});
