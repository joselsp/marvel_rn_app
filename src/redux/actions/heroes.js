import * as types from '../types/heroes'
import { fetchCharacters } from 'marvel_rn_app/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'
import qs from 'qs'

function updateHeroesList(value, total) {
    return {
        type: types.HEROES_UPDATE_LIST,
        value,
        total
    }
}

export function updateHeroesListOffset(value) {
    return {
        type: types.HEROES_UPDATE_LIST_OFFSET,
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
export function initHeroesList() {
    return (dispatch, getState) => {

        //Reset heroes list and set total to 0
        dispatch(updateHeroesList([], 0))

        // Set offset to 0
        dispatch(updateHeroesListOffset(0))

        // Fetch list
        dispatch(fetchHeroesList())
    }
}

export function fetchHeroesList() {
    return (dispatch, getState) => {

        dispatch(setHeroesFetching(true))

        const state = getState()
        // const heroe = state.heroes.item ? state.heroes.item.id : null
        const list = state.heroes.list

        const offset = state.heroes.offset
        const limit = 10

        const filters = {
            // heroe: heroe,
            offset: offset,
            limit: limit
        }

        fetchCharacters('/characters?' + qs.stringify(filters))
        .then((response) => {
            dispatch(setHeroesFetching(false))
            // const listaHeroes = response.data && response.data.results 
            //                     ? response.data.results 
            //                     : [] 
            
            const listaHeroes = response.data && response.data.results 
                                ? [...list, ...response.data.results] // Concat current list with new results
                                : [] 
            dispatch(updateHeroesList(listaHeroes, response.data.total))
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