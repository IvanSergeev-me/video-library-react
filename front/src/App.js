import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from './Redux/redux-store';
import './index.css';
import Library from './Components/Library/Library';
import { useSelector } from 'react-redux/es/exports';
import Load from './Components/Load/Load';
import Header from './Components/Header/Header';
import Playlist from './Components/Playlist/Playlist';
import styles from './App.module.css';
import { getClass } from './Assets/classHelper/classHelper';
import SearchResult from './Components/SearchResult/SearchResult';

const App = (props) =>{
  //const items = useSelector((state) => state.appInit.test);
  let theme = useSelector(state => state.appInit.theme)
  return(
    <>
      <Header />
      <main className={getClass(theme, styles, "main_section")}>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="load" element={<Load />} />
          <Route path="playlist/:id" element={<Playlist />} />
          <Route path="search" element={<SearchResult />} />
        </Routes>
        
      </main>
    </>
  );
}

const AppMain = (props) =>{
  return <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>
}

export default AppMain;
window.store = store;