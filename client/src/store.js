import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import bookReducer from './reducers/bookReducer'
import categoryReducer from './reducers/categoryReducer'
import staffReducer from './reducers/staffReducer'
import departmentReducer from './reducers/departmentReducer'
import studentReducer from './reducers/studentReducer'
import borrowReducer from './reducers/borrowReducer'

const reducers = combineReducers({
  userLogged: authReducer,
  notification: notificationReducer,
  books: bookReducer,
  categories: categoryReducer,
  staff: staffReducer,
  students: studentReducer,
  departments: departmentReducer,
  borrows: borrowReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
