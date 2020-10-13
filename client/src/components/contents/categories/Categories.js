import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Action from '../../globalComponents/Action'
import { deleteCategory } from '../../../reducers/categoryReducer'

const Categories = () => {
  const [search, setSearch] = useState('')
  const categories = useSelector((s) => {
    return search
      ? s.categories.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )
      : s.categories
  })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <Link
          to="/categories/add"
          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          Add Category
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
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Information</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((c) => (
                <tr className="border-b text-center" key={c.id}>
                  <td className="py-4 px-4">
                    <Link to={`categories/${c.id}`}>{c.name}</Link>
                  </td>
                  <td className="py-4 px-4">{c.information}</td>
                  <td className="py-4 px-4">
                    <Action
                      id={c.id}
                      editLink={`/categories/${c.id}/edit`}
                      titleDelete={`Categories`}
                      nameDelete={c.name}
                      targetDispatch={deleteCategory}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b text-center">
                <td colSpan={3} className="p-5">
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

export default Categories
