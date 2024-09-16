import * as React from "react";
import { createContext, useReducer, useEffect, useContext } from "react";
import {
  getAuthItem,
  setAuthItem,
  removeAuthItem,
  clearAuthStorage,
} from "~src/features/Authentication/utils/authStorage";

type User = {
  // Define user properties here
  _id: string;
  email: string;
  token: string;
};

type AuthState = {
  user: User | null;
};

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

type AuthContextType = AuthState & {
  dispatch: React.Dispatch<AuthAction>;
  login: (userData: User) => void;
  logout: () => void;
};

// Create context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const userInfo = getAuthItem("userInfo");
    if (userInfo) {
      dispatch({ type: "LOGIN", payload: userInfo });
    }
  }, []);

  const login = (userData: User) => {
    setAuthItem("userInfo", userData);
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    clearAuthStorage();
    dispatch({ type: "LOGOUT" });
  };

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
