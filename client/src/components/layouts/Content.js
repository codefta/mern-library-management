import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Books from '../contents/books/Books'
import AddBook from '../contents/books/AddBook'
import Categories from '../contents/categories/Categories'
import AddCategory from '../contents/categories/AddCategory'
import EditCategory from '../contents/categories/EditCategory'
import EditBook from '../contents/books/EditBook'
import Book from '../contents/books/Book'
import Category from '../contents/categories/Category'
import Staffs from '../contents/staff/Staffs'
import Staff from '../contents/staff/Staff'
import AddStaff from '../contents/staff/AddStaff'
import Departments from '../contents/department/Departments'
import AddDepartment from '../contents/department/AddDepartment'
import Department from '../contents/department/Department'
import EditDepartment from '../contents/department/EditDepartment'
import EditStaff from '../contents/staff/EditStaff'
import Students from '../contents/students/Students'
import AddStudent from '../contents/students/AddStudent'
import EditStudent from '../contents/students/EditStudent'
import Student from '../contents/students/Student'
import Borrow from '../contents/borrows/Borrow'
import AddBorrow from '../contents/borrows/AddBorrow'
import Borrows from '../contents/borrows/Borrows'

const Content = () => {
  return (
    <div className="p-10 w-full overflow-hidden bg-gray-200">
      <Switch>
        <Route path="/books/:id/edit">
          <EditBook />
        </Route>
        <Route path="/books/add">
          <AddBook />
        </Route>
        <Route path="/books/:id">
          <Book />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/categories/:id/edit">
          <EditCategory />
        </Route>
        <Route path="/categories/add">
          <AddCategory />
        </Route>
        <Route path="/categories/:id">
          <Category />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
        <Route path="/borrows/add">
          <AddBorrow />
        </Route>
        <Route path="/borrows/:id">
          <Borrow />
        </Route>
        <Route path="/borrows">
          <Borrows />
        </Route>
        <Route path="/staff/:id/edit">
          <EditStaff />
        </Route>
        <Route path="/staff/add">
          <AddStaff />
        </Route>
        <Route path="/staff/:id">
          <Staff />
        </Route>
        <Route path="/staff">
          <Staffs />
        </Route>
        <Route path="/students/:id/edit">
          <EditStudent />
        </Route>
        <Route path="/students/add">
          <AddStudent />
        </Route>
        <Route path="/students/:id">
          <Student />
        </Route>
        <Route path="/students">
          <Students />
        </Route>
        <Route path="/departments/:id/edit">
          <EditDepartment />
        </Route>
        <Route path="/departments/add">
          <AddDepartment />
        </Route>
        <Route path="/departments/:id">
          <Department />
        </Route>
        <Route path="/departments">
          <Departments />
        </Route>
        <Route exact path="/">
          <h1>Dashboard App</h1>
        </Route>
      </Switch>
    </div>
  )
}

export default Content
