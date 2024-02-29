import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
import { MemoryRouter } from "react-router-dom";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrarse correctamente con valores por defecto', () => {
        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe mostrar a Batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByTestId('alert-search');
        expect(alert.style.display).toBe('none');
    });

    test('debe mostrar un error si no se encuentra el hero', () => {
        render(
            <MemoryRouter initialEntries={['?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
        const alert = screen.getByLabelText('alert-error');
        expect(alert.style.display).toBeFalsy();
        expect(alert.innerHTML).toBe('No hero with <b>batman123</b>');
    });

    test('debe llamar el navigate a la pantalla nueva', () => {
        render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.input(input, {target: {value: 'batman'}});
        
        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockUseNavigate).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${input.value}`);
    });
});