import axios from 'axios'
import * as types from '../constants/commentConstants'
import cartUtils from '../utils/cartUtils';
import { logout } from '../actions/userActions'

export const getComments = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: types.COMMENT_LIST_REQUEST,
    })

    const { data } = await axios.get(`/api/v1/comments/${productId}`)
    // console.log(data);
    dispatch({
      type: types.COMMENT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: types.COMMENT_LIST_FAIL,
      payload: message,
    })
  }
}

export const addComment = (comment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.COMMENT_ADD_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    const { data } = await axios.post(`/api/v1/comments`, comment, config)
    console.log(data);

    dispatch({
      type: types.COMMENT_ADD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: types.COMMENT_ADD_FAIL,
      payload: message,
    })
  }
}
