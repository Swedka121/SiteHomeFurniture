
import React, { useContext, useEffect } from 'react'
import LoginForm from "../components/LoginForm.jsx"
import RegForm from "../components/RegForm.jsx"
import ProfilePageUI from "../components/ProfileUI.jsx"
import { Context } from '../index.js'
import { observer } from 'mobx-react-lite'

function Render_UI(store) {
  console.log(store.isAuth)
  if (store.isAuth === false) {
    if (store.isReg === true) {
      return (<LoginForm></LoginForm>)
    }
    return (<RegForm></RegForm>)
  } else {
    return (<ProfilePageUI/>)
  }
}

function Profile() {
    useEffect(() => {
      if (localStorage.getItem("token")) {
        store.checkAuth()
      }
    }, [])
    const store = useContext(Context)
    return Render_UI(store)
}

export default observer(Profile)
