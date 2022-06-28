import { applyMiddleware, combineReducers, createStore } from "redux";
import appReducer from "./app-reducer";
import libraryReducer from "./library-reducer";
import thunkMiddleware from 'redux-thunk';
import playlistReducer from "./playlist-reducer";
import loadReducer from "./load-reducer";

let reducers = combineReducers({
    load:loadReducer,
    appInit: appReducer,
    library:libraryReducer,
    playlist:playlistReducer

});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;