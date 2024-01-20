import { useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
import { types } from "../types/types";
import { User } from "../interfaces";
import { AuthContext } from "./AuthContext";

const init = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return {
      logged: true,
      user: JSON.parse(storedUser),
    };
  }
  return {
    logged: false,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = async ({
    name,
    fullname,
    email,
    profileImage,
    token,
    expires,
  }: User) => {
    const user = {
      name,
      fullname,
      email,
      profileImage,
      token,
      expires,
    };
    const action = { type: types.login, payload: user };
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem("user");
    const action = { type: types.logout };
    dispatch(action);
  };

  // const sessionQuery = useSessionQuery(accessToken);

  return (
    <AuthContext.Provider
      value={{
        auth: authState.logged,
        login,
        logout,
        user: authState.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
