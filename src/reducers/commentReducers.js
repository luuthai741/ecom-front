import * as types from '../constants/commentConstants'

export const getComments = (state = { comments: [] }, action) => {
  switch (action.type) {
    case types.COMMENT_LIST_REQUEST:
      return { loading: true }
    case types.COMMENT_LIST_SUCCESS:
      return { loading: false, comments: action.payload }
    case types.COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case types.COMMENT_LIST_RESET:
      return {}

    case types.COMMENT_ADD_REQUEST:
      return { addLoading: true }
    case types.COMMENT_ADD_SUCCESS:
      return { ...state, createdComment: action.payload, addLoading: false }
    case types.COMMENT_ADD_FAIL:
      return { ...state, addLoading: false, addError: action.payload }
    default:
      return { ...state }
  }
}
