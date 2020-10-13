import categoryService from '../services/categoryService'

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CATEGORY':
      return action.data
    case 'CREATE_CATEGORY':
      return [...state, action.data]
    case 'UPDATE_CATEGORY':
      return state.map((s) => (s.id === action.data.id ? action.data : s))
    case 'DELETE_CATEGORY':
      return state.filter((s) => s.id !== action.id)
    default:
      return state
  }
}

export const initCategory = () => {
  return async (dispatch) => {
    const userLogged = JSON.parse(window.localStorage.getItem('userLibraryApp'))

    if (userLogged) {
      await categoryService.setToken(userLogged.token)
      const categories = await categoryService.getAll()
      dispatch({
        type: 'INIT_CATEGORY',
        data: categories,
      })
    }
  }
}

export const createCategory = (newCategory) => {
  return async (dispatch) => {
    const savedCategory = await categoryService.create(newCategory)

    dispatch({
      type: 'CREATE_CATEGORY',
      data: savedCategory,
    })
  }
}

export const updateCategory = (category, id) => {
  return async (dispatch) => {
    const updatedCategory = await categoryService.update(category, id)

    dispatch({
      type: 'UPDATE_CATEGORY',
      data: updatedCategory,
    })
  }
}

export const deleteCategory = (id) => {
  return async (dispatch) => {
    const deletedCategory = await categoryService.remove(id)

    await dispatch({
      type: 'DELETE_CATEGORY',
      id,
    })
  }
}

export default categoryReducer
