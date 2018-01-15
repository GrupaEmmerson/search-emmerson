import {
    GET_LOCATION
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_LOCATION:
            return { ...state, location: action.payload };
   }
    return state;
}