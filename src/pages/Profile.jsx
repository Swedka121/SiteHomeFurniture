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
}
