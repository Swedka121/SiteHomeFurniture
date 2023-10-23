import React, {useState, useContext} from 'react'
import { Context } from '..'


export default function LoginForm() {
  const [email, useEmail] = useState("")
  const [password, usePassword] = useState("")
  const store = useContext(Context)
  return (
    <div className="LoginForm">
      <input className="input-type-1"
        onChange={(e) => (useEmail(e.target.value))} placeholder='email' type="text"></input>
      <input className="input-type-1"
        onChange={(e) => (usePassword(e.target.value))} placeholder='password' type="text"></input>
      <button className="login-button"
        onClick={() => store.login(email, password)}>Login</button>
    </div>
  )
}
