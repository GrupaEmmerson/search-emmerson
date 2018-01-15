import {GET_LOCATION, GET_VIEWPORT, GET_OFFERS, IS_LOADED, GET_PROPERTIES, GET_SEARCH, GET_ROWS_COUNT} from './types';

export function setLocation(location) {
    return function (dispatch) {
        dispatch({type: GET_LOCATION, payload: location});
    }
}

export function setViewport(location) {
    return function (dispatch) {
        dispatch({type: GET_VIEWPORT, payload: location});
    }
}

export function setOffers(offers) {
    return function (dispatch) {
        dispatch({type: GET_OFFERS, payload: offers});
    }
}

export function setIsLoaded(isLoaded) {
    return function (dispatch) {
        dispatch({type: IS_LOADED, payload: isLoaded});
    }
}

export function setSearchProperties(data) {
    return function (dispatch) {
        dispatch({type: GET_PROPERTIES, payload: data});
    }
}

export function setSearch(data) {
    let url = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]).replace(/true/, '1').replace(/false/, '0')
    }).join('&');

    return function (dispatch) {
        dispatch({type: GET_SEARCH, payload: '&'+url});
    }
}

export function setRowsCount(data) {
    return function (dispatch) {
        dispatch({type: GET_ROWS_COUNT, payload: data});
    }
}