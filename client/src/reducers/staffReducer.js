import staffService from '../services/staffService'

const staffReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_STAFF':
      return action.data
    case 'CREATE_STAFF':
      return [...state, action.data]
    case 'UPDATE_STAFF':
      return state.map((s) => (s.id === action.data.id ? action.data : s))
    case 'DELETE_STAFF':
      return state.filter((s) => s.id !== action.id)
    default:
      return state
  }
}

export const initStaff = () => {
  return async (dispatch) => {
    const userLogged = JSON.parse(window.localStorage.getItem('userLibraryApp'))

    if (userLogged) {
      await staffService.setToken(userLogged.token)
      const staff = await staffService.getAll()

      dispatch({
        type: 'INIT_STAFF',
        data: staff,
      })
    }
  }
}

export const createStaff = (newStaff) => {
  return async (dispatch) => {
    const staffSaved = await staffService.create(newStaff)

    dispatch({
      type: 'CREATE_STAFF',
      data: staffSaved,
    })
  }
}

export const updateStaff = (staff, id) => {
  return async (dispatch) => {
    const staffUpdated = await staffService.update(staff, id)

    dispatch({
      type: 'UPDATE_STAFF',
      data: staffUpdated,
    })
  }
}

export const deleteStaff = (id) => {
  return async (dispatch) => {
    await staffService.remove(id)

    dispatch({
      type: 'DELETE_STAFF',
      id,
    })
  }
}

export default staffReducer
