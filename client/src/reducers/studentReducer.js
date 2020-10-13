import studentService from '../services/studentService'

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_STUDENTS':
      return action.data
    case 'CREATE_STUDENT':
      return [...state, action.data]
    case 'UPDATE_STUDENT':
      return state.map((s) => (s.id === action.data.id ? action.data : s))
    case 'DELETE_STUDENT':
      return state.filter((s) => s.id !== action.id)
    default:
      return state
  }
}

export const initStudents = () => {
  return async (dispatch) => {
    const userLogged = JSON.parse(window.localStorage.getItem('userLibraryApp'))

    if (userLogged) {
      await studentService.setToken(userLogged.token)
      const students = await studentService.getAll()

      dispatch({
        type: 'INIT_STUDENTS',
        data: students,
      })
    }
  }
}

export const createStudent = (newStudent) => {
  return async (dispatch) => {
    const userLogged = JSON.parse(window.localStorage.getItem('userLibraryApp'))

    if (userLogged) {
      await studentService.setToken(userLogged.token)
      const studentSaved = await studentService.create(newStudent)

      dispatch({
        type: 'CREATE_STUDENT',
        data: studentSaved,
      })
    }
  }
}

export const updateStudent = (student, id) => {
  return async (dispatch) => {
    const studentUpdated = await studentService.update(student, id)

    dispatch({
      type: 'UPDATE_STUDENT',
      data: studentUpdated,
    })
  }
}

export const deleteStudent = (id) => {
  return async (dispatch) => {
    await studentService.remove(id)

    dispatch({
      type: 'DELETE_STUDENT',
      id,
    })
  }
}

export default studentReducer
