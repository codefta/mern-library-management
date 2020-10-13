import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Staff = () => {
  const staffs = useSelector((s) => s.staff)
  const match = useRouteMatch('/staff/:id')

  const staff = match ? staffs.find((s) => s.id === match.params.id) : null
  console.log(staff)

  if (!staff) {
    return null
  }

  return (
    <div className="bg-white shadow-md py-4 px-4 rounded">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl">Staff Detail</h1>
        <Link
          to="/staff"
          className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
      <hr className="mb-5" />

      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Staff Number</p>
        </div>
        <div className="w-10/12">{staff.staffNumber}</div>
      </div>

      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Name</p>
        </div>
        <div className="w-10/12">{staff.fullName}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Gender</p>
        </div>
        <div className="w-10/12">{staff.gender}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Birth of Date</p>
        </div>
        <div className="w-10/12">
          {moment(staff.birthOfDate).format('MMMM Do YYYY')}
        </div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>Email</p>
        </div>
        <div className="w-10/12">{staff.email}</div>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-2/12">
          <p>isAdmin</p>
        </div>
        <div className="w-10/12">
          {staff.isAdmin ? (
            <div className="bg-teal-500 w-10 rounded text-white mb-2 px-1 py-1">
              Yes
            </div>
          ) : (
            <div className="bg-danger-500 w-10 rounded text-white mb-2 px-1 py-1">
              No
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Staff
