import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Category = () => {
  const categories = useSelector((s) => s.categories)
  const match = useRouteMatch('/categories/:id')

  const category = match
    ? categories.find((c) => c.id === match.params.id)
    : null

  if (!category) {
    return null
  }

  return (
    <div className="bg-white shadow-md py-4 px-4 rounded">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl">Category Detail</h1>
        <Link
          to="/categories"
          className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
      <hr className="mb-5" />

      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Name</p>
        </div>
        <div className="w-10/12">{category.name}</div>
      </div>

      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Information</p>
        </div>
        <div className="w-10/12">{category.information}</div>
      </div>
    </div>
  )
}

export default Category
