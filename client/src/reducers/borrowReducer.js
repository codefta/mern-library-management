import borrowService from '../services/borrowService'

const borrowReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BORROWS':
      return action.data
    case 'CREATE_BORROW':
      return [...state, action.data]
    case 'EDIT_BORROW':
      return state.map((s) => (s.id === action.data.id ? action.data : s))
    case 'DELETE_BORROW':
      return state.filter((s) => s.id !== action.id)
    default:
      return state
  }
}

export const initBorrows = () => {
  return async (dispatch) => {
    const userLogged = JSON.parse(window.localStorage.getItem('userLibraryApp'))

    if (userLogged) {
      await borrowService.setToken(userLogged.token)

      const books = await borrowService.getAll()

      dispatch({
        type: 'INIT_BORROWS',
        data: books,
      })
    }
  }
}

export const createBorrow = (newBook) => {
  return async (dispatch) => {
    const bookSaved = await borrowService.create(newBook)

    dispatch({
      type: 'CREATE_BORROW',
      data: bookSaved,
    })
  }
}

export const updateBorrow = (book, id) => {
  return async (dispatch) => {
    const updatedBook = await borrowService.update(book, id)

    dispatch({
      type: 'EDIT_BORROW',
      data: updatedBook,
    })
  }
}

export const deleteBorrow = (id) => {
  return async (dispatch) => {
    const deletedBook = await borrowService.remove(id)

    dispatch({
      type: 'DELETE_BORROW',
      id,
    })
  }
}

export default borrowReducer
