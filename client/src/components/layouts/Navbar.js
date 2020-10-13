import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/authReducer'
import { useHistory } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async () => {
    await dispatch(logout())
    history.push('/login')
  }

  return (
    <div className="flex justify-between p-5 shadow w-full bg-white z-50">
      <h1>Library Management</h1>
      <button className="outline-none" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Navbar
