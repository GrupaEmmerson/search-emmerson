import {
    GET_ROWS_COUNT
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case GET_ROWS_COUNT:
            return { ...state, rowsCount: action.payload };
   }
    return state;
}