import { applyMiddleware, combineReducers, createStore } from "redux";
import appReducer from "./app-reducer";
import libraryReducer from "./library-reducer";
import thunkMiddleware from 'redux-thunk';
import playlistReducer from "./playlist-reducer";
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    form: formReducer,
    appInit: appReducer,
    library:libraryReducer,
    playlist:playlistReducer

});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;