// import React, { createContext, useState, useEffect } from "react";
// import { getToken, logoutUser } from "./authService";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkLoginStatus();
//   }, []);

//   const checkLoginStatus = async () => {
//     const token = await getToken();
//     setUser(token ? token : null);
//     setLoading(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
