// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "http://your-backend-url/api/auth";

// export const registerUser = async (name, email, password) => {
//   return await axios.post(`${API_URL}/register`, { name, email, password });
// };

// export const loginUser = async (email, password) => {
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   await AsyncStorage.setItem("authToken", response.data.token);
//   return response.data;
// };

// export const logoutUser = async () => {
//   await AsyncStorage.removeItem("authToken");
// };

// export const getToken = async () => {
//   return await AsyncStorage.getItem("authToken");
// };
