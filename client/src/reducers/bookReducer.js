import bookService from '../services/bookService'

const bookReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BOOKS':
      return action.data
    case 'CREATE_BOOK':
      return [...state, action.data]
    case 'EDIT_BOOK':
      return state.map((s) => (s.id === action.data.id ? action.data : s))
    case 'DELETE_BOOK':
      return state.filter((s) => s.id !== action.id)
    default:
      return state
  }
}

export const initBooks = () => {
  return async (dispatch) => {
    const userLogged = JSON.parse(window.localStorage.getItem('userLibraryApp'))

    if (userLogged) {
      await bookService.setToken(userLogged.token)

      const books = await bookService.getAll()

      dispatch({
        type: 'INIT_BOOKS',
        data: books,
      })
    }
  }
}

export const createBook = (newBook) => {
  return async (dispatch) => {
    const bookSaved = await bookService.create(newBook)

    dispatch({
      type: 'CREATE_BOOK',
      data: bookSaved,
    })
  }
}

export const updateBook = (book, id) => {
  return async (dispatch) => {
    const updatedBook = await bookService.update(book, id)

    dispatch({
      type: 'EDIT_BOOK',
      data: updatedBook,
    })
  }
}

export const deleteBook = (id) => {
  return async (dispatch) => {
    const deletedBook = await bookService.remove(id)

    dispatch({
      type: 'DELETE_BOOK',
      id,
    })
  }
}

export default bookReducer
