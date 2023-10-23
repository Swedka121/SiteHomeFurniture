
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
}
