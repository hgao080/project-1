import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'
import Login from './pages/Login'
import CompetitionTest from './pages/CompetitionTest'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="admin" element={<Admin/>}/>
      <Route path="competition/:competitionId" element={<CompetitionTest />}/>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
