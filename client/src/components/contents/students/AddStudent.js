import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../../layouts/Notification'
import { notifError, notifSuccess } from '../../../reducers/notificationReducer'
import SelectField from '../../globalComponents/SelectField'
import { createStudent } from '../../../reducers/studentReducer'

const AddStudent = () => {
  const dispatch = useDispatch()
  const departments = useSelector((s) => s.departments)

  return (
    <>
      <Notification />
      <div className="bg-white shadow-md py-4 px-4 rounded ">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl">Add Student</h1>
          <Link
            to="/students"
            className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>
        <hr className="mb-5" />

        <Formik
          initialValues={{
            studentNumber: '',
            fullName: '',
            gender: '',
            dateOfBirth: '',
            department: '',
            email: '',
          }}
          onSubmit={async (values) => {
            try {
              console.log(values)
              await dispatch(
                createStudent({
                  studentNumber: values.studentNumber.toString(),
                  fullName: values.fullName,
                  gender: values.gender.value,
                  birthOfDate: new Date(values.dateOfBirth),
                  email: values.email,
                  department: values.department.value,
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
            studentNumber: Yup.number().min(8).required(),
            fullName: Yup.string().min(3).required(),
            gender: Yup.string().required(),
            dateOfBirth: Yup.date().required(),
            email: Yup.string().email().required(),
            department: Yup.string().required(),
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
                    htmlFor="studentNumber"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Student Number
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="number"
                    className={
                      errors.studentNumber && touched.studentNumber
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="studentNumber"
                    onChange={handleChange}
                    value={values.studentNumber}
                    onBlur={handleBlur}
                    placeholder="Student Number"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.studentNumber && touched.studentNumber && (
                    <div className="text-red-500">{errors.studentNumber}</div>
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
                    htmlFor="department"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Department
                  </label>
                </div>
                <div className="w-10/12">
                  <SelectField
                    name="department"
                    id="department"
                    options={departments.map((d) => {
                      return {
                        value: d.name,
                        label: d.name,
                      }
                    })}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.department && touched.department && (
                    <div className="text-red-500">{errors.department}</div>
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

export default AddStudent
