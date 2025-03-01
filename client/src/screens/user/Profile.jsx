import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from './../../../tailwind';
import { AppContext } from '../../context/AppProvider';
import images from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const { currentUser } = useContext(AppContext);
    const navigation = useNavigation();

    async function LogOut() {
        try {
            await AsyncStorage.removeItem("token");
            const token = await AsyncStorage.getItem("token"); // Check if token is really removed
            console.log("Token after removal:", token); // Should be null
            navigation.replace("LandingPage"); // Navigate after token removal
        } catch (error) {
            console.error("Error removing token:", error);
        }
    }

    return (
        <View style={tw`flex-1 items-center justify-center bg-black`}>
            <Text>Profile</Text>
            <View style={tw`flex items-center`}>
                <Image source={images.LandingGirl} style={tw`h-60 w-60 rounded-full`} />
                <Text style={[tw`text-white text-4xl mt-6`, { fontFamily: "CabinBold" }]}>{currentUser.name}</Text>
                <Text style={[tw`text-white text-xl`, { fontFamily: "Urban" }]}>{currentUser.email}</Text>
                <Pressable style={tw`w-full`} onPress={LogOut}>
                    <Text style={[tw`bg-red px-16 py-2 text-xl rounded-2xl mt-6 w-full`, { fontFamily: "Cabin" }]}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({});
