import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en <PublicRoute />', () => {
    test('debe mostrar el children si no está autenticado', () => {
        const contextValue = {
            logged: false
        }
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <PublicRoute>
                        <h1>Ruta pública</h1>
                    </PublicRoute>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Ruta pública')).toBeTruthy();
    });

    test('debe navegar si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Joan',
                id: '123'
            }
        }
        render(
            
                <AuthContext.Provider value={contextValue}>
                    <MemoryRouter initialEntries={['/login']}>
                        <Routes>
                            <Route path="login" element={
                                <PublicRoute>
                                    <h1>Ruta pública</h1>
                                </PublicRoute>
                            }/>
                            <Route path="/*" element={<h1>Marvel</h1>} />
                        </Routes>
                    </MemoryRouter>        
                </AuthContext.Provider>
            
        );

        expect(screen.getByText('Marvel')).toBeTruthy();
    });
});