import React, {useState, useContext, useEffect} from 'react'
import $api from "../http/index"
import SliderService from '../services/SliderService'
import "../styles/loginform.scss"
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

function RegForm() {
  const [email, useEmail] = useState("")
  const [password, usePassword] = useState("")
  const [slider, useSlider] = useState([])
  const [sliderIndex, useSliderIndex] = useState(0)
  const store = useContext(Context)

  useEffect(() => {
    $api.get("http://localhost:9001/api/getslider/slider1")
      .then(responce => {useSlider(responce.data.data)})
  }, [])
  useEffect(() => {
    return SliderService.timer(3000, useSliderIndex, sliderIndex, slider)
  })
  return (
    <div className='LoginForm'>
      <div className="Form">
        <Link to="/" className='btn-back'>Back</Link>
        <div className="form-login">
          <h1>Registration</h1>
          <input type="text" onChange={(e) => {useEmail(e.target.value)}} placeholder='email'></input>
          <input type="text" onChange={(e) => {usePassword(e.target.value)}} placeholder='password'></input>
          <button className='btn-login' onClick={() => store.registration(email, password)}>Registration</button>
          <button onClick={() => store.setReg(!store.isReg)}><h1>Login</h1></button>
        </div>
      </div>
      <div className='Slider'>
        {
          slider.map((slide_item) => <img className='slider_img' src={slide_item.img} key={slide_item.id} style= {{marginLeft: (-60 * slide_item.id) + (60 * sliderIndex) + "vw"}}></img>)
        }
      </div>
    </div>
  )
}

export default observer(RegForm)