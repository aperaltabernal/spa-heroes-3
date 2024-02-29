import { fireEvent, render, screen } from "@testing-library/react";
import { HeroPage } from "../../../src/heroes/pages/HeroPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <HeroPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe enrutar a la ruta de /marvel si el heroe no existe', () => {
        render(
            <MemoryRouter initialEntries={['/hero/no-existe']}>
                
                <Routes>
                    <Route path="/marvel" element={<h1>Marvel Page</h1>} />
                    <Route path="/login" element={<h1>Login Page</h1>} />
                    <Route path="hero/:id" element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Marvel Page')).toBeTruthy();
    });

    test('debe mostrar un heroe al pasar el id como parte de la ruta relativa', () => {
        render(
            <MemoryRouter initialEntries={['/hero/dc-arrow']}>
                
                <Routes>
                    <Route path="hero/:id" element={<HeroPage />}/>
                </Routes>
                
            </MemoryRouter>
        );

        expect(screen.getByRole('img').src).toContain('dc-arrow');
        expect(screen.getByText('Green Arrow')).toBeTruthy();
    });

    test('debe ejecutar la funcion del navigate back al presionar el botón de Regresar', () => {
        
        render(
            <MemoryRouter initialEntries={['/hero/dc-superman']}>
                <Routes>
                    <Route path="hero/:id" element={<HeroPage />}/>
                </Routes>
            </MemoryRouter>
        );

        const buttonBack = screen.getByRole('button');
        fireEvent.click(buttonBack);

        expect(mockUseNavigate).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith(-1);
        
    });


});