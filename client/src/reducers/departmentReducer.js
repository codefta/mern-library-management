import departmentService from '../services/departmentService'

const departmentReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_DEPARTMENTS':
      return action.data
    case 'CREATE_DEPARTMENT':
      return [...state, action.data]
    case 'UPDATE_DEPARTMENT':
      return state.map((s) => (s.id === action.data.id ? action.data : s))
    case 'DELETE_DEPARTMENT':
      return state.filter((s) => s.id !== action.id)
    default:
      return state
  }
}

export const initDepartments = () => {
  return async (dispatch) => {
    const userLogged = JSON.parse(window.localStorage.getItem('userLibraryApp'))

    if (userLogged) {
      await departmentService.setToken(userLogged.token)
      const categories = await departmentService.getAll()
      dispatch({
        type: 'INIT_DEPARTMENTS',
        data: categories,
      })
    }
  }
}

export const createDepartment = (newDepartment) => {
  return async (dispatch) => {
    const savedDepartment = await departmentService.create(newDepartment)

    dispatch({
      type: 'CREATE_DEPARTMENT',
      data: savedDepartment,
    })
  }
}

export const updateDepartment = (department, id) => {
  return async (dispatch) => {
    const updatedDepartment = await departmentService.update(department, id)

    dispatch({
      type: 'UPDATE_DEPARTMENT',
      data: updatedDepartment,
    })
  }
}

export const deleteDepartment = (id) => {
  return async (dispatch) => {
    const deletedDepartment = await departmentService.remove(id)

    await dispatch({
      type: 'DELETE_DEPARTMENT',
      id,
    })
  }
}

export default departmentReducer
