import {
    GET_VIEWPORT
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_VIEWPORT:
            return { ...state, viewport: action.payload };
    }
    return state;
}