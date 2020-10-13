import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Notification from '../../layouts/Notification'
import { notifError, notifSuccess } from '../../../reducers/notificationReducer'
import { createDepartment } from '../../../reducers/departmentReducer'

const AddDepartment = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Notification />
      <div className="bg-white shadow-md py-4 px-4 rounded">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl">Add Department</h1>
          <Link
            to="/departments"
            className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>
        <hr className="mb-5" />

        <Formik
          initialValues={{
            name: '',
            information: '',
          }}
          onSubmit={async (values) => {
            try {
              await dispatch(
                createDepartment({
                  name: values.name,
                  information: values.information,
                })
              )
              dispatch(notifSuccess(`${values.name} was successfully created`))
            } catch (e) {
              dispatch(notifError(e.response.data.error))
            }
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            information: Yup.string().required(),
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
                    htmlFor="name"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Name
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="text"
                    className={
                      errors.name && touched.name
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="name"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    placeholder="name"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.name && touched.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="information"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Information
                  </label>
                </div>
                <div className="w-10/12">
                  <textarea
                    id="information"
                    className={
                      errors.information && touched.information
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    placeholder="Information"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.information}
                  ></textarea>
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.information && touched.information && (
                    <div className="text-red-500">{errors.information}</div>
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

export default AddDepartment
