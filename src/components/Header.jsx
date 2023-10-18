import React, { useState } from 'react'
import "../styles/index.scss"
import { NavLink } from "react-router-dom"
import Burger from "../components/Burger.jsx"
import Cart from "./Cart.jsx"


export default function header(props) {
  const [burgerState, useBurgerState] = useState(false)
  const [cartState, useCartState] = useState(false)
    return (
        <div className='header'>
            <button className='burger' onClick={() => {useBurgerState(!burgerState)}}></button>
            <div className='logo'>
                <div className='logo-img'></div>
                <div className='logo-text'></div>
            </div>
            <div className='line'></div>
            <NavLink to="/" className='home'></NavLink>
            <NavLink to="/profile" className='profile'></NavLink>
            <input type="text" className='search'></input>
            <button className='cart' onClick={() => {useCartState(!cartState)}}></button>
            <Burger active={burgerState} chooseCategory={props.chooseCategory} page={props.page}></Burger>
            <Cart active={cartState}></Cart>
        </div>
  )
}
