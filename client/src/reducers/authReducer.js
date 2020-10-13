import authService from '../services/authService'

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const initUser = () => {
  return async (dispatch) => {
    const isUserLogged = window.localStorage.getItem('userLibraryApp')

    if (isUserLogged) {
      const user = await JSON.parse(isUserLogged)

      dispatch({
        type: 'INIT_USER',
        data: user,
      })
    } else {
      logout()
    }
  }
}

export const login = ({ email, password }) => {
  return async (dispatch) => {
    const userLogged = await authService.login({ email, password })

    window.localStorage.setItem('userLibraryApp', JSON.stringify(userLogged))

    dispatch({
      type: 'LOGIN',
      data: userLogged,
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('userLibraryApp')

    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default authReducer
