import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Action from '../../globalComponents/Action'
import { deleteStaff } from '../../../reducers/staffReducer'

const Staffs = () => {
  const [search, setSearch] = useState('')
  const staff = useSelector((s) => {
    return search
      ? s.staff.filter((c) =>
          c.fullName.toLowerCase().includes(search.toLowerCase())
        )
      : s.staff
  })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <Link
          to="/staff/add"
          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          Add Staff
        </Link>

        <input
          type="text"
          placeholder="Search by Name"
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
              <th className="py-4 px-4">Staff Number</th>
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Email</th>
              <th className="py-4 px-4">Admin</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length > 0 ? (
              staff.map((s) => (
                <tr className="border-b text-center" key={s.id}>
                  <td className="py-4 px-4">{s.staffNumber}</td>
                  <td className="py-4 px-4">
                    <Link to={`staff/${s.id}`}>{s.fullName}</Link>
                  </td>
                  <td className="py-4 px-4">{s.email}</td>
                  <td className="py-4 px-4">
                    {s.isAdmin ? (
                      <div className="bg-teal-500 rounded text-white mb-2 px-1 py-1">
                        Yes
                      </div>
                    ) : (
                      <div className="bg-danger-500 rounded text-white mb-2 px-1 py-1">
                        No
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Action
                      id={s.id}
                      editLink={`/staff/${s.id}/edit`}
                      titleDelete={`staff`}
                      nameDelete={s.fullName}
                      targetDispatch={deleteStaff}
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

export default Staffs
