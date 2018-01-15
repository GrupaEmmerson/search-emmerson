import {
    GET_SEARCH
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_SEARCH:
            return { ...state, search: action.payload };
    }
    return state;
}