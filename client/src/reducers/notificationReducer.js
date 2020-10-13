let timeoutId

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'ERROR':
      return action.data
    case 'SUCCESS':
      return action.data
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const notifError = (message) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)

    await dispatch({
      type: 'ERROR',
      data: {
        type: 'error',
        message,
      },
    })

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      })
    }, 5 * 1000)
  }
}

export const notifSuccess = (message) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)

    await dispatch({
      type: 'SUCCESS',
      data: {
        type: 'success',
        message,
      },
    })

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      })
    }, 5 * 1000)
  }
}

export default notificationReducer
