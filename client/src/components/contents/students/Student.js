import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Student = () => {
  const students = useSelector((s) => s.students)
  const match = useRouteMatch('/students/:id')

  const student = match ? students.find((s) => s.id === match.params.id) : null

  if (!student) {
    return null
  }

  return (
    <div className="bg-white shadow-md py-4 px-4 rounded">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl">Student Detail</h1>
        <Link
          to="/students"
          className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
      <hr className="mb-5" />

      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Student Number</p>
        </div>
        <div className="w-10/12">{student.studentNumber}</div>
      </div>

      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Name</p>
        </div>
        <div className="w-10/12">{student.fullName}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Gender</p>
        </div>
        <div className="w-10/12">{student.gender}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Birth of Date</p>
        </div>
        <div className="w-10/12">
          {moment(student.birthOfDate).format('MMMM Do YYYY')}
        </div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Email</p>
        </div>
        <div className="w-10/12">{student.email}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Department</p>
        </div>
        <div className="w-10/12">{student.department}</div>
      </div>
    </div>
  )
}

export default Student
