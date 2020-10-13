import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDepartment } from '../../../reducers/departmentReducer'
import Action from '../../globalComponents/Action'

const Departments = () => {
  const [search, setSearch] = useState('')
  const departments = useSelector((s) => {
    return search
      ? s.departments.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )
      : s.departments
  })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <Link
          to="/departments/add"
          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          Add Department
        </Link>

        <input
          type="text"
          placeholder="Search by Informatics"
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
            {departments.length > 0 ? (
              departments.map((c) => (
                <tr className="border-b text-center" key={c.id}>
                  <td className="py-4 px-4">
                    <Link to={`/departments/${c.id}`}>{c.name}</Link>
                  </td>
                  <td className="py-4 px-4">{c.information}</td>
                  <td className="py-4 px-4">
                    <Action
                      id={c.id}
                      editLink={`/departments/${c.id}/edit`}
                      titleDelete={`Departments`}
                      nameDelete={c.name}
                      targetDispatch={deleteDepartment}
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

export default Departments
