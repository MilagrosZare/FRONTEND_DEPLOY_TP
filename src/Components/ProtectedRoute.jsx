import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    //Llama a isAuthenticatedState
    const {isAuthenticatedState} = useContext(AuthContext)
  return (
    isAuthenticatedState
    ? <Outlet/>
    : <Navigate to = {'/login'}/>
  )
}

export default ProtectedRoute