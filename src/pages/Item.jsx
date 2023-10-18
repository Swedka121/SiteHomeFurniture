import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from "../components/Header.jsx"
import "../styles/Item.scss"

export default function Item() {
    const { id } = useParams()
    const [ item, useItem ] = useState({})
    const [ options, useOptions ] = useState([])

    function AddToCart(item) {
        const localStore = JSON.parse(localStorage.getItem("Cart"))
        if (localStore === null) {
            localStorage.setItem("Cart", JSON.stringify([item]))
        } else {
            localStorage.setItem("Cart", JSON.stringify([...localStore, item]))
        }

        
    }

    useEffect(() => {
        const dataToServer = {id: id}
        console.log(JSON.stringify(dataToServer))
        fetch("http://localhost:9001/api/getitem/", {
            method: "POST",
            body: JSON.stringify(dataToServer),
            headers: {
                "Content-Type": "application/json",
              },
        } )
        .then(response => response.json())
        .then(data => useItem(data))
        
    }, [])

    useEffect(() => {
        console.log(item)
        if (item.options != undefined) {
            var massive = []
            item.options.map((option) => {
                console.log(option.title.length)
                if (option.title.length > 0) {
                    massive.push(option)
                }
            })
            useOptions(massive)
        }
    }, [item])
    const img_url = "url("+item.img+")"
    console.log(img_url)
    return (
        <div>
            <Header></Header>
            <div className='item-single'>
                <div className='img' style={{backgroundImage: `url(${item.img})`}}></div>
                <div className='content'>
                    <h1 className='title'>{item.title}</h1>
                    <div className='columns'>
                        <div className='column first'>
                            <div className='des'>
                                <p>{item.des}</p>
                            </div>
                            <h1 className='price'>{`price: ${item.price}$`}</h1>
                            <button className='buy-btn' onClick={() => {AddToCart(item)}}>Buy</button>
                        </div>
                        <div className='column second'>
                            {
                                options.map((option) => <h1 className='option'>{option.title}:{option.value}</h1>)
                                
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
