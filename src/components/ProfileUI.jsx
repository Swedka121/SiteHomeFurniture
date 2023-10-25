import React, { useContext } from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

function ProfileUI() {
  const store = useContext(Context)
  return (
    <div><button onClick={() => store.logout()}>Logout</button></div>
  )
}

export default observer(ProfileUI)
