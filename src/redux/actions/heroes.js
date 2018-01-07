import * as types from '../types/heroes'
import { fetchCharacters } from 'marvel_rn_app/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'

function updateHeroesList(value) {
    return {
        type: types.HEROES_UPDATE_LIST,
        value
    }
}

export function updateHeroeSelected(value) {
    return {
        type: types.HEROES_UPDATE_HEROE,
        value
    }
}

function setHeroesFetching(value){
    return {
        type: types.HEROES_SET_FETCHING,
        value
    }
}

function postHeroeWithoutWS(value) {
    return {
        type: types.HEROES_POST_HEROE,
        value
    }
}

export function fetchHeroesList() {
    return (dispatch, getState) => {

        dispatch(setHeroesFetching(true))
        fetchCharacters('/characters')
        .then((response) => {
            dispatch(setHeroesFetching(false))
            const listaHeroes = response.data && response.data.results 
                                ? response.data.results 
                                : [] 

            dispatch(updateHeroesList(listaHeroes))
        }).catch((error) => {
            dispatch(setHeroesFetching(false))
            console.log("fetchCharacters error: ", error)
        });        
    }
}

export function postHeroe(data) {
    return (dispatch, getState) => {
    
        const state = getState()
        console.log("postHeroe", state)
        dispatch(postHeroeWithoutWS(data))

        Actions.pop()
    }
}