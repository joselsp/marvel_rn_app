import * as types from '../types/heroes'

const initialState = {
    isFetching: false,
    list: [],
    item: null,
}

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        
        case types.HEROES_UPDATE_LIST:
            return {
                ...state,
                list: action.value
            }

        case types.HEROES_UPDATE_HEROE:
            return {
                ...state,
                item: action.value
            }

        case types.HEROES_SET_FETCHING:
        return {
            ...state,
            isFetching: action.value
        }

        case types.HEROES_POST_HEROE:

        // console.log("reducer: action.value", action.value)
        // console.log("reducer: state", state)

        // var stateList = state.list
        // console.log("reducer: stateList", stateList)
        // stateList.push(action.value)
        // console.log("reducer: stateList Push", stateList)

        return {
            ...state,
            // list: stateList
        }

        default:
            return state
    }
}