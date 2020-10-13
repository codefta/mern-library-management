import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = () => {
  const [active, setActiveMenu] = useState(null)

  return (
    <div className="flex flex-col bg-white z-0 mt-2 overflow-hidden border-r w-64">
      <Link
        to="/books"
        className={
          active === 'books'
            ? 'pl-10 py-5 text-white bg-teal-500'
            : 'pl-10 py-5'
        }
        onClick={() => setActiveMenu('books')}
      >
        Books
      </Link>
      <Link
        to="/categories"
        className={
          active === 'categories'
            ? 'pl-10 py-5 text-white bg-teal-500'
            : 'pl-10 py-5'
        }
        onClick={() => setActiveMenu('categories')}
      >
        Category
      </Link>
      <Link
        to="/borrows"
        className={
          active === 'borrows'
            ? 'pl-10 py-5 text-white bg-teal-500'
            : 'pl-10 py-5'
        }
        onClick={() => setActiveMenu('borrows')}
      >
        Borrow
      </Link>
      <Link
        to="/staff"
        className={
          active === 'staff'
            ? 'pl-10 py-5 text-white bg-teal-500'
            : 'pl-10 py-5'
        }
        onClick={() => setActiveMenu('staff')}
      >
        Staff
      </Link>
      <Link
        to="/students"
        className={
          active === 'students'
            ? 'pl-10 py-5 text-white bg-teal-500'
            : 'pl-10 py-5'
        }
        onClick={() => setActiveMenu('students')}
      >
        Students
      </Link>
      <Link
        to="/departments"
        className={
          active === 'departments'
            ? 'pl-10 py-5 text-white bg-teal-500'
            : 'pl-10 py-5'
        }
        onClick={() => setActiveMenu('departments')}
      >
        Department
      </Link>
    </div>
  )
}

export default Sidebar
