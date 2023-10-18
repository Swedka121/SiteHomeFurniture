import React, { useEffect, useState } from 'react'
import "../styles/index.scss"

export default function Cart(props) {
    const [checkout, useCheckOut] = useState(false)
    const [items, useItems] = useState([])
    useEffect(() => {
        const localStore = JSON.parse(localStorage.getItem("Cart"))
        useItems(localStore)
    })
    if (props.active === true) {
       if (items != null) {
        return (<div className="Modal-cart active-cart">
            <h1 className='title'>Hi, I`m Cart</h1>
            <div className='content'>
                {
                    items.map((element) => (<div className='cart-item'>
                        <h1>{element.title}</h1>
                        <p>{element.price + "$"}</p>
                        <div className='cart-item-img' style={{backgroundImage: `url(${element.img})`}}></div>
                    </div>))
                }
            </div>
            <button className='cart-buy-btn' onClick={(() => {localStorage.setItem("Cart", JSON.stringify([]))})}>To pay checkout</button>
        </div>)
       } else {
        return (<div className="Modal-cart active-cart">
            <h1 className='title'>Hi, I`m Cart</h1>
            <div className='content'><h1 className='messege'>Your cart is emerty!</h1></div>
            <button className='cart-buy-btn' onClick={(() => {useCheckOut(!checkout)})}>To pay checkout</button>
        </div>)
       }
    }
    else {
        return (<div className='Modal-cart'></div>)
    }
}
