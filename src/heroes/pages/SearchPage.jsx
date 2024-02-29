import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import queryString from "query-string";

import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
    const inputRef = useRef();
    
    const navigate = useNavigate();
    const {search} = useLocation();//Para obtener los queryparams de la url

    const {q = ''} = queryString.parse(search);//Para parsear los queryparams a un formato facil de obtener
    const heroes = getHeroesByName(q);

    const showSearch = (q.length === 0);
    const showError = (q.length > 0 && heroes.length === 0);

    const {searchText, onInputChange} = useForm({
        searchText: q
    });


    const onSearchSubmit = (event) => {
        event.preventDefault();

        //Al navegar vuelve a renderizar el componente
        navigate(`?q=${searchText}`);//agrega un queryparam a la ruta relativa actual
        inputRef.current.select();
    }

    return (
        <>
            <h1>Search</h1>
            <hr />
            
            <div className="row">
                <div className="col-7">
                    <h4>Searching</h4>
                    <hr />

                    <form aria-label="form" onSubmit={onSearchSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search a hero"
                            name="searchText"
                            onChange={onInputChange}
                            value={searchText}
                            ref={inputRef}
                        />
                        <button className="btn btn-outline-primary mt-1">
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-5">
                    <h4>Result</h4>
                    <hr />

                    {/* {
                        (q === '')
                        ? <div className="alert alert-primary">Search a hero</div>
                        : (heroes.length === 0) && <div className="alert alert-danger">No het with <b>{q}</b></div>
                    } */}

                    <div data-testid="alert-search" className="alert alert-primary animate__animated animate__fadeIn" style={{display: showSearch ? '' : 'none'}}>Search a hero</div>
                    <div aria-label="alert-error" className="alert alert-danger animate__animated animate__fadeIn" style={{display: showError ? '' : 'none'}}>No hero with <b>{q}</b></div>

                    {
                        heroes.map(hero => (<HeroCard key={hero.id} {...hero}/>))
                    }
                </div>
            </div>
            
        </>
    )
}