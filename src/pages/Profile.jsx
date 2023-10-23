<<<<<<< HEAD
import React, { useContext } from 'react'
import LoginForm from "../components/LoginForm.jsx"
import RegForm from "../components/RegForm.jsx"
import ProfilePageUI from "../components/ProfileUI.jsx"
import { Context } from '../index.js'

function Render_UI(store) {
  if (store.isAuth === false) {
    if (store.isReg === true) {
      return (<LoginForm></LoginForm>)
    }
    return (<RegForm></RegForm>)
  } else {
    return (<ProfilePageUI/>)
  }
}

  export default function Profile() {
    const store = useContext(Context)
    return Render_UI(store)
=======
import React from 'react'
import LoginForm from "../components/LoginForm.jsx"
import RegForm from "../components/RegForm.jsx"
import ProfilePageUI from "../components/ProfileUI.jsx"

function Render_UI(state) {
  switch(state) {
    case "Login":
      return (
        <LoginForm></LoginForm>
      )
    case "Reg":
      return (
        <RegForm></RegForm>
      )
    case "Profile":
      return (
        <ProfilePageUI></ProfilePageUI>
      )  
    }
}

  export default function Profile() {
    Render_UI()
>>>>>>> 7a61246a6c4575602504068723a6cd8bed73de1a
}
