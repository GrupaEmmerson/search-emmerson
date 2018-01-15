import {
    GET_PROPERTIES
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_PROPERTIES:
            return { ...state, searchProperties: action.payload };
    }
    return state;
}