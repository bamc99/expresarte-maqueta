export interface AuthAction {
    type: string;
    payload?: User;
}

export interface AuthState {
    logged: boolean;
    user?: User;
}

export interface User {
    name: string;
    fullname: string;
    email: string;
    profileImage: string;
    token: string;
    expires: string;
}