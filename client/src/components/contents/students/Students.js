import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Action from '../../globalComponents/Action'
import { deleteStudent } from '../../../reducers/studentReducer'

const Students = () => {
  const [search, setSearch] = useState('')
  const students = useSelector((s) => {
    return search
      ? s.students.filter((c) =>
          c.fullName.toLowerCase().includes(search.toLowerCase())
        )
      : s.students
  })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <Link
          to="/students/add"
          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          Add Student
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
              <th className="py-4 px-4">Student Number</th>
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Department</th>
              <th className="py-4 px-4">Email</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr className="border-b text-center" key={s.id}>
                  <td className="py-4 px-4">{s.studentNumber}</td>
                  <td className="py-4 px-4">
                    <Link to={`students/${s.id}`}>{s.fullName}</Link>
                  </td>
                  <td className="py-4 px-4">{s.email}</td>
                  <td className="py-4 px-4">{s.department}</td>
                  <td className="py-4 px-4">
                    <Action
                      id={s.id}
                      editLink={`/students/${s.id}/edit`}
                      titleDelete={`students`}
                      nameDelete={s.fullName}
                      targetDispatch={deleteStudent}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b text-center">
                <td colSpan={5} className="p-5">
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

export default Students
