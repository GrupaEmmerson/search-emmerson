import {
    IS_LOADED
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case IS_LOADED:
            return { ...state, isLoaded: action.payload };
    }
    return state;
}