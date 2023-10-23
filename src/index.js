<<<<<<< HEAD
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
import Store from './store/store';

const store = new Store()
export const Context = createContext({
    store,
})
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
>>>>>>> 7a61246a6c4575602504068723a6cd8bed73de1a

import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import Item from "./pages/Item.jsx"
import ErrorPage from './pages/errorpage.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
    <Context.Provider value={store}>
        <BrowserRouter basename='/'>
            <Routes>
                <Route path='/' element={<Home></Home>} errorElement={<ErrorPage/>}/>
                <Route path='/profile' element={<Profile/>} />
                <Route path='/item/:id' element={<Item></Item>} errorElement={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    </Context.Provider>
    
=======
    <BrowserRouter basename='/'>
        <Routes>
            <Route path='/' element={<Home></Home>} errorElement={<ErrorPage/>}/>
            <Route path='/profile' element={<ErrorPage/>} />
            <Route path='/item/:id' element={<Item></Item>} errorElement={<ErrorPage/>}/>
        </Routes>
    </BrowserRouter>
>>>>>>> 7a61246a6c4575602504068723a6cd8bed73de1a
);


