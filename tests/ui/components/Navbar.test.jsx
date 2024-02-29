import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui/components/Navbar";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";

const mockUseNavigate = jest.fn();
//De esta forma se puede hacer un mock de una librería completa
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),//esta linea trae todas las demás implementaciones de la librería completa
    useNavigate: () => mockUseNavigate//aquí solo se hace el mock de uno de los hooks de la librería
}));

describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            id: '123',
            name: 'Joan'
        },
        logout: jest.fn()
    };

    test('debe mostrar el nombre del usuario', () => {
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    });

    test('debe llamar el logout y navigate cuando se hace click en el boton', () => {
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutButton = screen.getByRole('button');
        fireEvent.click(logoutButton);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {
            replace: true
        });
    });
});