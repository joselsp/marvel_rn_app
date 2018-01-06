import axios from 'axios'
import * as constants from './constants'

export function configureAxios() {
    axios.defaults.baseURL = constants.BASE_URL;    
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Referer'] = constants.REFERER;
}

export function fetchCharacters() {
    const url = '/characters?apikey=' + constants.PUBLIC_APYKEY
    
    axios.get(url).then((response) => {
        console.log("fetchCharacters response: ", response)
    }).catch((error) => {
        console.log("fetchCharacters error: ", error)
    });
}