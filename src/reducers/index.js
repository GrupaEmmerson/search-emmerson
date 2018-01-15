import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import locationReducer from './location_reducer';
import viewportReducer from './viewport_reducer';
import offersReducer from './offers_reducer';
import isLoadedReducer from './is_loaded_reducer';
import searchPropertiesReducer from './search_properties_reducer';
import searchReducer from './search_reducer';
import rowsCountReducer from './rows_count_reducer';


const rootReducer = combineReducers({
  form,
  location: locationReducer,
  viewport: viewportReducer,
  offers: offersReducer,
  isLoaded: isLoadedReducer,
  searchProperties: searchPropertiesReducer,
  rowsCount: rowsCountReducer,
  search: searchReducer
});

export default rootReducer;
