import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import Admin from './Pages/Admin'
import Login from './pages/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="admin" element={<Admin/>}/>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
