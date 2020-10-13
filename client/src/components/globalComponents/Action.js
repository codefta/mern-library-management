import React, { useState, Fragment } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

const Action = ({ id, editLink, titleDelete, nameDelete, targetDispatch }) => {
  const [dropdown, setDropdown] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)

  const handleShowDropdown = (id) => {
    if (!dropdown.includes(id)) {
      setDropdown([...dropdown, id])
    } else {
      const dropdownCopy = [...dropdown]
      const index = dropdownCopy.indexOf(id)
      if (index > -1) {
        dropdownCopy.splice(index, 1)
      }

      setDropdown([...dropdownCopy])
    }
  }

  const handleShowDelete = () => {
    setDeleteModal(true)
  }

  const handleFinishDelete = (isShow) => {
    setDeleteModal(isShow)
  }

  return (
    <div className="inline-block">
      <button
        type="button"
        style={{ outline: 'none' }}
        onClick={() => handleShowDropdown(id)}
      >
        <MoreVertIcon color="action" />
      </button>
      <div
        className="absolute mt-1 w-20 rounded-md shadow-lg"
        style={dropdown.includes(id) ? {} : { display: 'none' }}
      >
        <div className="rounded-md bg-white shadow-xs">
          <div className="py-1">
            {editLink && (
              <Link
                to={editLink}
                className="block py-3 hover:bg-teal-500 hover:text-white"
              >
                Edit
              </Link>
            )}
            <button
              type="button"
              className="py-3 hover:bg-teal-500 hover:text-white"
              onClick={handleShowDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteModal
          id={id}
          title={titleDelete}
          name={nameDelete}
          targetDispatch={targetDispatch}
          handleFinishDelete={handleFinishDelete}
        />
      )}
    </div>
  )
}

export default Action
