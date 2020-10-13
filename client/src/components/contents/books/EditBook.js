import React from 'react'
import { Formik, useField } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useSelector, useDispatch } from 'react-redux'
import { updateBook } from '../../../reducers/bookReducer'
import { notifSuccess, notifError } from '../../../reducers/notificationReducer'
import Notification from '../../layouts/Notification'
import { Link, useRouteMatch } from 'react-router-dom'

const animatedComponents = makeAnimated()

const SelectField = ({ name, ...selectProps }) => {
  const [field, meta, helpers] = useField(name)

  return (
    <Select
      value={field.defaultValue}
      onChange={(v) => helpers.setValue(v)}
      onBlur={() => helpers.setTouched(true)}
      {...selectProps}
    />
  )
}

const EditBook = () => {
  const dispatch = useDispatch()
  const books = useSelector((s) => s.books)
  const categories = useSelector((s) => s.categories)

  const match = useRouteMatch('/books/:id/edit')
  const book = match ? books.find((c) => c.id === match.params.id) : null

  if (!book) {
    return null
  }

  return (
    <>
      <Notification />
      <div className="bg-white shadow-md py-4 px-4 rounded">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl">Add Books</h1>
          <Link
            to="/books"
            className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>
        <hr className="mb-5" />

        <Formik
          initialValues={{
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            category: book.category,
            publishedAt: book.publishedAt,
            language: book.language,
          }}
          onSubmit={async (values) => {
            console.log(values)
            try {
              await dispatch(
                updateBook(
                  {
                    isbn: values.isbn,
                    title: values.title,
                    author: values.author,
                    category: values.category.map((c) => c.value),
                    publishedAt: values.publishedAt,
                    language: values.language,
                  },
                  book.id
                )
              )
              await dispatch(
                notifSuccess(`${values.title} was successfully updated`)
              )
            } catch (e) {
              await dispatch(notifError(e.response.data.error))
            }
          }}
          validationSchema={Yup.object().shape({
            isbn: Yup.string().min(8).required(),
            title: Yup.string().required(),
            category: Yup.array(),
            publishedAt: Yup.number().min(4).required(),
            language: Yup.string().required(),
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
                    htmlFor="isbn"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    ISBN
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="text"
                    className={
                      errors.isbn && touched.isbn
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    id="isbn"
                    onChange={handleChange}
                    value={values.isbn}
                    onBlur={handleBlur}
                    placeholder="ISBN"
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.isbn && touched.isbn && (
                    <div className="text-red-500">{errors.isbn}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="title"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Title
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="text"
                    id="title"
                    className={
                      errors.title && touched.title
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    placeholder="Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.title && touched.title && (
                    <div className="text-red-500">{errors.title}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="author"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Author
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="text"
                    id="author"
                    className={
                      errors.author && touched.author
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    placeholder="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.author && touched.author && (
                    <div className="text-red-500">{errors.author}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="category"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Category
                  </label>
                </div>
                <div className="w-10/12">
                  <SelectField
                    name="category"
                    defaultValue={
                      values.category
                        ? values.category.map((c) => {
                            return {
                              label: c,
                              value: c,
                            }
                          })
                        : {}
                    }
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={categories.map((c) => {
                      return {
                        value: c.name,
                        label: c.name,
                      }
                    })}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.category && touched.category && (
                    <div className="text-red-500">{errors.title}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="publishedAt"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Year of Published
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="number"
                    id="publishedAt"
                    className={
                      errors.publishedAt && touched.publishedAt
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    placeholder="publishedAt"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.publishedAt}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.publishedAt && touched.publishedAt && (
                    <div className="text-red-500">{errors.publishedAt}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center mb-4">
                <div className="w-2/12">
                  <label
                    htmlFor="language"
                    className="block text-gray font-bold mb-1 md:mb-0 pr-4"
                  >
                    Language
                  </label>
                </div>
                <div className="w-10/12">
                  <input
                    type="text"
                    id="language"
                    className={
                      errors.language && touched.language
                        ? 'bg-gray-200 appereance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                        : 'bg-gray-200 appereance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500'
                    }
                    placeholder="language"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.language}
                  />
                </div>
                <div className="w-2/12"></div>
                <div className="w-10/12">
                  {errors.language && touched.language && (
                    <div className="text-red-500">{errors.language}</div>
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

export default EditBook
