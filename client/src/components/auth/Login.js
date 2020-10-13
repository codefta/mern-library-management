import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/authReducer'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { notifError } from '../../reducers/notificationReducer'
import Notification from '../layouts/Notification'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div className="bg-gray-200 h-screen flex items-center flex-col">
      <h1 className="text-xl  mt-10 text-4xl text-gray-600 mb-10">
        Welcome to Library Management App
      </h1>
      <div className="max-w-xs">
        <Notification />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            try {
              await dispatch(
                login({ email: values.email, password: values.password })
              )
              history.push('/')
            } catch (e) {
              await dispatch(notifError(e.response.data.error))
            }
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().required('Password is required'),
          })}
        >
          {({
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 mb-4 py-3 mt-3"
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'shadow appereance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      : 'shadow appereance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  }
                />
                {errors.email && touched.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={
                    errors.password && touched.password
                      ? 'shadow appereance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-thight focus:outline-none focus:shadow-outline'
                      : 'shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-thight focus:outline-none focus:shadow-outline'
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
                <a
                  href="#"
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
