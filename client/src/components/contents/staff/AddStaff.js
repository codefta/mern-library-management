import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Notification from '../../layouts/Notification'
import { notifError, notifSuccess } from '../../../reducers/notificationReducer'
import SelectField from '../../globalComponents/SelectField'
import { createStaff } from '../../../reducers/staffReducer'

const AddStaff = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Notification />
      <div className="bg-white shadow-md py-4 px-4 rounded ">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl">Add Staff</h1>
          <Link
            to="/staff"
            className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>
        <hr className="mb-5" />

        <Formik
          initialValues={{
            staffNumber: '',
            fullName: '',
            gender: '',
            dateOfBirth: '',
            email: '',
            password: '',
            passwordConfirm: '',
            isAdmin: false,
          }}
          onSubmit={async (values) => {
            try {
              console.log(values)
              await dispatch(
                createStaff({
                  staffNumber: values.staffNumber.toString(),
                  fullName: values.fullName,
                  gender: values.gender.value,
                  birthOfDate: new Date(values.dateOfBirth),
                  email: values.email,
                  password: values.password,
                  isAdmin: values.isAdmin.value,
                })
              )
              await dispatch(
                notifSuccess(`${values.fullName} was successfully created`)
              )
            } catch (e) {
              dispatch(notifError(e.response.data.error))
            }
          }}
          validationSchema={Yup.object().shape({
            staffNumber: Yup.number().min(8).required(),
            fullName: Yup.string().min(3).required(),
            gender: Yup.string().required(),
            dateOfBirth: Yup.date().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            passwordConfirm: Yup.string().oneOf(
              [Yup.ref('password'), null],
              'Password must match'
            ),
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
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="staffNumber"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Staff Number
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="number"
                    className={
                      errors.staffNumber && touched.staffNumber
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="staffNumber"
                    onChange={handleChange}
                    value={values.staffNumber}
                    onBlur={handleBlur}
                    placeholder="Staff Number"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.staffNumber && touched.staffNumber && (
                    <div className="text-red-500">{errors.staffNumber}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="fullName"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Full Name
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="text"
                    className={
                      errors.fullName && touched.fullName
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="fullName"
                    onChange={handleChange}
                    value={values.fullName}
                    onBlur={handleBlur}
                    placeholder="Full Name"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.fullName && touched.fullName && (
                    <div className="text-red-500">{errors.fullName}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="gender"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Gender
                  </label>
                </div>
                <div className="w-10/12">
                  <SelectField
                    name="gender"
                    id="gender"
                    options={[
                      {
                        value: 'male',
                        label: 'Male',
                      },
                      {
                        value: 'female',
                        label: 'Female',
                      },
                    ]}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.gender && touched.gender && (
                    <div className="text-red-500">{errors.gender}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Date of Birth
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="text"
                    className={
                      errors.dateOfBirth && touched.dateOfBirth
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="dateOfBirth"
                    onChange={handleChange}
                    value={values.dateOfBirth}
                    onBlur={handleBlur}
                    placeholder="mm/dd/yyyy"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <div className="text-red-500">{errors.dateOfBirth}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="email"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Email
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="email"
                    className={
                      errors.email && touched.email
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    placeholder="Email"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="password"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Password
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="password"
                    className={
                      errors.password && touched.password
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    placeholder="password"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Password Confirm
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="password"
                    className={
                      errors.passwordConfirm && touched.passwordConfirm
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="passwordConfirm"
                    onChange={handleChange}
                    value={values.passwordConfirm}
                    onBlur={handleBlur}
                    placeholder="passwordConfirm"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <div className="text-red-500">{errors.passwordConfirm}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="isAdmin"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Admin?
                  </label>
                </div>
                <div className="w-10/12">
                  <SelectField
                    name="isAdmin"
                    id="isAdmin"
                    defaultValue={{
                      value: false,
                      label: 'False',
                    }}
                    options={[
                      {
                        value: true,
                        label: 'Yes',
                      },
                      {
                        value: false,
                        label: 'False',
                      },
                    ]}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.isAdmin && touched.isAdmin && (
                    <div className="text-red-500">{errors.isAdmin}</div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-2/12 self-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-10"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default AddStaff
