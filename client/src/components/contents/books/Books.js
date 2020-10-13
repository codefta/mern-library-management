import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Action from '../../globalComponents/Action'
import { deleteBook } from '../../../reducers/bookReducer'

const Books = () => {
  const [search, setSearch] = useState('')
  const books = useSelector((s) => {
    return search
      ? s.books.filter((b) =>
          b.title.toLowerCase().includes(search.toLowerCase())
        )
      : s.books
  })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <Link
          to="/books/add"
          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          Add Book
        </Link>

        <input
          type="text"
          placeholder="Search by Title"
          className="bg-gray-200 appereance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading light focus:outline-none focus:bg-white focus:border-teal-500"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>

      <hr className="mt-5 mb-5 bg-gray-700 divide-y-2" />

      <div className="shadow-lg bg-white rounded ">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-4">ISBN</th>
              <th className="py-4 px-4">Title</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Year Published</th>
              <th className="py-4 px-4">Language</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((b) => (
                <tr className="border-b text-center" key={b.id}>
                  <td className="py-4 px-4">{b.isbn}</td>
                  <td className="py-4 px-4">
                    <Link to={`/books/${b.id}`}>{b.title}</Link>
                  </td>
                  <td className="py-4 px-4">
                    {b.category.map((c, i) => (
                      <div
                        className="bg-teal-500 rounded text-white mb-2 px-1 py-1"
                        key={i}
                      >
                        {c}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-4">{b.publishedAt}</td>
                  <td className="py-4 px-4">{b.language}</td>
                  <td className="py-4 px-4">
                    <Action
                      id={b.id}
                      editLink={`/books/${b.id}/edit`}
                      titleDelete={`Books`}
                      nameDelete={b.name}
                      targetDispatch={deleteBook}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b text-center">
                <td colSpan={6} className="p-5">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books
