// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/axios";
// import { decodeToken } from "../utils/jwtDecode";

// interface User {
//   userId: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   currentUser: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider = ({ children }: any) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       const user = decodeToken(token);
//       console.log("decoded user info is", user);
//       setCurrentUser(user);
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     const res = await api.post("/auth/login", {
//       email,
//       password,
//     });

//     const token = res.data.token;

//     localStorage.setItem("token", token);

//     const user = decodeToken(token);

//     setCurrentUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setCurrentUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         isAuthenticated: !!currentUser,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { decodeToken } from "../utils/jwtDecode";

interface User {
  userId: string;
  email: string;
  role: string;
}

interface Profile {
  fullName: string;
  email: string;
  role: string;
  imagePath?: string;
}

interface AuthContextType {
  currentUser: User | null;
  profile: Profile | null; // ✅ NEW
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>; // ✅ NEW
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null); // ✅ NEW

  // ✅ Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const res = await api.get("/employees/my-profile");
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);
      setCurrentUser(user);

      // ✅ fetch profile after token load
      fetchProfile();
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    const token = res.data.token;
    localStorage.setItem("token", token);

    const user = decodeToken(token);
    setCurrentUser(user);

    // ✅ fetch profile after login
    await fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setProfile(null); // ✅ reset
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        profile, // ✅ expose
        isAuthenticated: !!currentUser,
        login,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
