import React from 'react'
import { useRoutMatch, useRouteMatch, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Borrow = () => {
  const books = useSelector((s) => s.books)
  const match = useRouteMatch('/books/:id')

  const book = match ? books.find((b) => b.id === match.params.id) : null

  if (!book) {
    return null
  }

  return (
    <div className="bg-white shadow-md py-4 px-4 rounded">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl">Book Detail</h1>
        <Link
          to="/books"
          className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
      <hr className="mb-5" />

      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>ISBN</p>
        </div>
        <div className="w-10/12">{book.isbn}</div>
      </div>

      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Title</p>
        </div>
        <div className="w-10/12">{book.title}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Author</p>
        </div>
        <div className="w-10/12">{book.author}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Categories</p>
        </div>
        <div className="w-10/12">
          <ul>
            {book.category.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Language</p>
        </div>
        <div className="w-10/12">{book.language}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Year of Published</p>
        </div>
        <div className="w-10/12">{book.publishedAt}</div>
      </div>
    </div>
  )
}

export default Borrow
