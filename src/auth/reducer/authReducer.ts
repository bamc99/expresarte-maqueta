import { AuthAction, AuthState } from '../interfaces';
import { types } from '../types/types';

const initialState: AuthState = {
    logged: false
};

export const authReducer = (
    state: AuthState = initialState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload
            };

        case types.logout:
            return {
                logged: false
            };

        default:
            return state;
    }
};