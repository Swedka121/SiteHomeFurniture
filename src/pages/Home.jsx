import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import Header from "../components/Header.jsx"
import "../styles/Home.scss"

export default function Home() {
  const [hero, useHero] = useState([])
  const [items, useItems] = useState([])
  const [currentItems, useCurrentItems] = useState([])
  const [heroindex, useHeroIndex] = useState(0) 
  
  function chooseCategory(category) {
    console.log(category)
    if (category === "all") {
      useCurrentItems(items)
      return
    }
    useCurrentItems(items.filter(el => el.type === category))
  }

  useEffect(() => {
    fetch("http://localhost:9001/api/gethero")
    .then(res => {return res.json()})
    .then(data => {useHero(data.data)})
  }, [])
  useEffect(() => {
    useCurrentItems(items)
  }, [items])
  useEffect(() => {
    fetch("http://localhost:9001/api/getitems/")
    .then(res => {return res.json()})
    .then(data => {useItems(data.data);})
    
  }, [])
  useEffect(() => {
    if (hero.length != 0) {
      const interval = setInterval(() => {
        if (heroindex === hero.length -1 ) {useHeroIndex(0); console.log(hero.length)}
        else(useHeroIndex(heroindex + 1))
      }, 10000);
      return () => clearInterval(interval);
    }
  })
  return (
    <div>
      <Header chooseCategory={chooseCategory} page="home"></Header>
      <div className='body'>
        <div className='photos'>
          {
            hero.map((hero_url) => <img className='hero_img' src={hero_url.img} key={hero_url.id} style= {{marginLeft: (-100 * hero_url.id) + (100 * heroindex) + "vw"}}></img>)
          }
        </div>
        <div className='items'>
          {
            currentItems.map((element) => <div className='item'>
              <img src={element.img}></img>
              <h1 className='price'>{element.price + "$"}</h1>
              <h1 className='title'>{element.title}</h1>
              <Link to={"/item/" + element._id} className='Link'><div className='buy'><h1>Buy</h1></div></Link>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}
