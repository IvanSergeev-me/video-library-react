import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider, connect,useSelector} from "react-redux";
import store from './Redux/redux-store';
import './index.css';
import Library from './Components/Library/Library';
import Load from './Components/Load/Load';
import Header from './Components/Header/Header';

const App = (props) =>{
  //const items = useSelector((state) => state.appInit.test);
  return(
    <>
      <Header />
      <main className="main_section">
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="load" element={<Load />} />
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