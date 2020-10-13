import React from 'react'
import { Formik, useField } from 'formik'
import * as Yup from 'yup'
import makeAnimated from 'react-select/animated'
import { useSelector, useDispatch } from 'react-redux'
import { notifSuccess, notifError } from '../../../reducers/notificationReducer'
import Notification from '../../layouts/Notification'
import { Link } from 'react-router-dom'
import SelectField from '../../globalComponents/SelectField'
import { createBorrow } from '../../../reducers/borrowReducer'

const animatedComponents = makeAnimated()

const AddBorrow = () => {
  const dispatch = useDispatch()
  const students = useSelector((s) => s.students)
  const books = useSelector((s) => s.books)
  console.log(books)

  return (
    <>
      <Notification />
      <div className="bg-white shadow-md py-4 px-4 rounded">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl">Add Transaction</h1>
          <Link
            to="/borrows"
            className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>
        <hr className="mb-5" />

        <Formik
          initialValues={{
            student: '',
            book: [],
          }}
          onSubmit={async (values) => {
            try {
              await dispatch(
                createBorrow({
                  student: values.student.value,
                  book: values.book.map((b) => b.value),
                })
              )
              await dispatch(
                notifSuccess(
                  `${values.student.value} was successfully borrowed`
                )
              )
            } catch (e) {
              await dispatch(notifError(e.response.data.error))
            }
          }}
          validationSchema={Yup.object().shape({
            student: Yup.string().required(),
            book: Yup.array().required(),
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
                    htmlFor="student"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Student
                  </label>
                </div>
                <div className="w-10/12">
                  <SelectField
                    name="student"
                    options={students.map((s) => {
                      return {
                        value: s.id,
                        label: s.fullName,
                      }
                    })}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.student && touched.student && (
                    <div className="text-red-500">{errors.student}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="book"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Books
                  </label>
                </div>
                <div className="w-10/12">
                  <SelectField
                    name="book"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={books.map((s) => {
                      return {
                        value: s.id,
                        label: s.title,
                      }
                    })}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.book && touched.book && (
                    <div className="text-red-500">{errors.book}</div>
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

export default AddBorrow
