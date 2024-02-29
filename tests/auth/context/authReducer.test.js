import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {
    const initialState = {
        logged: false,
        user: null
    }

    const user = {
        id: 'ABC',
        name: 'Joan'
    }

    test('debe retornar el estado por defecto', () => {
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('debe llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: user
        };

        const {logged, user} = authReducer(initialState, action);
        expect(logged).toBeTruthy();
        expect(user).toEqual(action.payload);
    });

    test('debe borrar el name del usuario y logged en false', () => {
        const actionLogin = {
            type: types.login,
            payload: user
        };
        const state = authReducer(initialState, actionLogin);
        
        const actionLogout = {
            type: types.logout
        };
        const {logged} = authReducer(state, actionLogout);

        expect(logged).toBeFalsy();
    });
});