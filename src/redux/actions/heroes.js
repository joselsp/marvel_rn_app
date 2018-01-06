import * as types from '../types/heroes'
import { fetchCharacters } from 'marvel_rn_app/src/webservices/webservices'

function updateHeroesList(value) {
    return {
        type: types.HEROES_UPDATE_LIST,
        value
    }
}

export function fetchHeroesList() {
    return (dispatch, getState) => {

        fetchCharacters('/characters')
        .then((response) => {
            const listaHeroes = response.data && response.data.results 
                                ? response.data.results 
                                : [] 

            dispatch(updateHeroesList(listaHeroes))
        }).catch((error) => {
            console.log("fetchCharacters error: ", error)
        });

        
    }
}