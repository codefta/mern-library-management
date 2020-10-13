import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import Navbar from './components/layouts/Navbar'
import Sidebar from './components/layouts/Sidebar'
import Content from './components/layouts/Content'
import Footer from './components/layouts/Footer'
import Login from './components/auth/Login'

import { initUser } from './reducers/authReducer'
import { initBooks } from './reducers/bookReducer'
import { initCategory } from './reducers/categoryReducer'
import { initStaff } from './reducers/staffReducer'
import { initDepartments } from './reducers/departmentReducer'
import { initStudents } from './reducers/studentReducer'
import { initBorrows } from './reducers/borrowReducer'

const App = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector((s) => s.userLogged)

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBooks())
    dispatch(initCategory())
    dispatch(initStaff())
    dispatch(initDepartments())
    dispatch(initStudents())
    dispatch(initBorrows())
  }, [dispatch])

  return userLogged ? (
    <>
      <div className="h-full">
        <Navbar />
        <div className="flex h-full">
          <Sidebar />
          <Content />
        </div>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </>
  )
}

export default App
