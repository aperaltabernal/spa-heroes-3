import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { render, screen } from "@testing-library/react";

describe('Pruebas en <PrivateRoute />', () => {
    test('debe mostrar el children si está autenticado', () => {

    

        //Para probar el localStorage se debe sobreescribir el Storage.prototype y luego si evaluar el localStorage
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Joan A.'
            }
        }
        render(
            <MemoryRouter initialEntries={['/marvel?q=batman']}>
                <AuthContext.Provider value={contextValue}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </AuthContext.Provider>
            </MemoryRouter>
        );


        expect(screen.getByText('Ruta privada')).toBeTruthy();

        //Evalua el localStorage, previamente se debe sobreescribir el Storage.prototype
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel?q=batman");

    });
});