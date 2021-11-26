import { AuthActions, SetAuthenticated, SetUnauthenticated, SET_AUTHENTICATED, SET_UNAUNTHENTICATED } from './auth.actions';

export interface State {
    isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false
};

export function authReducer( state: State = initialState, action: AuthActions) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            }
        case SET_UNAUNTHENTICATED:
            return {
                isAuthenticated: false
            }
        default: return state;

    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;