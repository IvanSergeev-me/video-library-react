import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from "./app-reducer";
import libraryReducer from "./library-reducer";
import thunkMiddleware from 'redux-thunk';
import playlistReducer from "./playlist-reducer";
import loadReducer from "./load-reducer";
import searchReducer from "./search-reducer";

let reducers = combineReducers({
    load:loadReducer,
    appInit: appReducer,
    library:libraryReducer,
    playlist:playlistReducer,
    search:searchReducer

});
let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;