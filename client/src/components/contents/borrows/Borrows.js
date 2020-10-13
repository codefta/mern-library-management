import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Action from '../../globalComponents/Action'
import { deleteBorrow, updateBorrow } from '../../../reducers/borrowReducer'
import moment from 'moment'
import { notifError, notifSuccess } from '../../../reducers/notificationReducer'
import Notification from '../../layouts/Notification'

const Borrows = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const borrows = useSelector((s) => {
    return search
      ? s.borrows.filter((b) =>
          b.student.fullName.toLowerCase().includes(search.toLowerCase())
        )
      : s.borrows
  })

  const handleReturn = async (id) => {
    try {
      const borrow = await dispatch(updateBorrow({ return: new Date() }, id))
      await dispatch(
        notifSuccess(
          `${borrow.student.fullName} was successfully returned his book`
        )
      )
    } catch (e) {
      await dispatch(notifError(e.response.data.error))
    }
  }

  return (
    <div className="container mx-auto">
      <Notification />
      <div className="flex justify-between">
        <Link
          to="/borrows/add"
          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          Add Transaction
        </Link>

        <input
          type="text"
          placeholder="Search by Student Name"
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
              <th className="py-4 px-4">Student</th>
              <th className="py-4 px-4">Books</th>
              <th className="py-4 px-4">From</th>
              <th className="py-4 px-4">To</th>
              <th className="py-4 px-4">Return</th>
              <th className="py-4 px-4">Verified by</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrows.length > 0 ? (
              borrows.map((b) => (
                <tr className="border-b text-center" key={b.id}>
                  <td className="py-4 px-4">
                    <Link to={`/borrows/${b.id}`}>{b.student.fullName}</Link>
                  </td>
                  <td className="py-4 px-4">
                    {b.book.map((b) => (
                      <li key={b.id}>{b.title}</li>
                    ))}
                  </td>
                  <td className="py-4 px-4">
                    {moment(b.from).format('MMMM Do YYYY')}
                  </td>
                  <td className="py-4 px-4">
                    {moment(b.to).format('MMMM Do YYYY')}
                  </td>
                  <td className="py-4 px-4">
                    {b.return ? (
                      moment(b.return).format('MMMM Do YYYY')
                    ) : (
                      <button
                        onClick={() => handleReturn(b.id)}
                        className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
                      >
                        Yes
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-4">{b.staff.fullName}</td>
                  <td className="py-4 px-4">
                    <Action
                      id={b.id}
                      titleDelete={`Borrows Transaction`}
                      nameDelete={b.name}
                      targetDispatch={deleteBorrow}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b text-center">
                <td colSpan={7} className="p-5">
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

export default Borrows
