import { useEffect, useState } from 'react'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { Outlet } from "react-router-dom";
function App() {

  return (
    <div>
      <nav className="my-nav"><h2>App Name</h2><button></button></nav>
      <Outlet />
    </div>
  )
}

export default App
