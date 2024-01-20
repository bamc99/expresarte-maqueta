import { createContext } from "react";
import { User } from "../interfaces";

interface AuthContextProps {
    auth: boolean;
    login: (user: User) => Promise<void>;
    logout: () => void;
    user?: User;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);