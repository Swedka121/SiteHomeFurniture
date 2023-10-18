import React from 'react'
import { useEffect, useState } from 'react'
import "../styles/index.scss"

function Change(key) {
  var returned = localStorage.getItem(key)
  console.log(returned)
  if (returned === "true") {
    console.log("h1")
    localStorage.setItem(key, false)
  } else {
    localStorage.setItem(key, true)
  }
}

export default function Burger(props) {
  console.log(props)
  const [isLoaded, useIsLoaded] = useState("")
  const [ Ldata, useLData] = useState("")
  
  useEffect(() => {
    fetch("http://localhost:9001/api/getconfig/")
      .then(responce => responce.json())
      .then(data => {
        try {
          useLData(data.toRes)
        }
        catch (err) {
          console.log(err)
        }
        finally {
          useIsLoaded(true)
        }
      })
  }, [])
  
  if (props.active == true) {
    if (isLoaded == true) {
      if (props.page === "home") {
        return <div className='Modal-burger active'>
          <div className='content'>
            {
              Ldata[0].types.map((type) => <div className='type'><button className='type-btn' onClick={(e) => {props.chooseCategory(type.Type)}}>Change</button><h1>{type.Type}</h1></div>)
            }
          </div>
        </div>
      } else {
        return <div className='Modal-burger active'>
          <div className='content'>
            <h1 className='Loading'>You can only use it on the Home page!</h1>
          </div>
        </div>
      }
    } else {
      return  <div className='Modal-burger active'><div className='content'><h1 className='Loading'>Loading...</h1></div></div>
    }
  } else {
    return <div className='Modal-burger'></div>
  }
}

