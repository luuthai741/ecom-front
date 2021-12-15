import axios from 'axios'
import * as types from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    })


    const { data } = await axios.post(
      '/api/v1/auth/signin',
      userInfo
    )
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: types.USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: types.USER_RESET })
    dispatch({ type: types.USER_LOGOUT_REQUEST })
    const { data } = await axios.post(`/api/v1/auth/logout?id=${userInfo.id}`)
    console.log(data);
    dispatch({
      type: types.USER_LOGOUT_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: types.USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REGISTER_REQUEST,
    })
    const { data } = await axios.post('/api/v1/auth/signup', userInfo)

    dispatch({
      type: types.USER_REGISTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get(`api/v1/info/${id}`, config)

    dispatch({
      type: types.USER_DETAILS_SUCCESS,
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
      type: types.USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.post(`/api/v1/info`, user, config)

    dispatch({
      type: types.USER_UPDATE_PROFILE_SUCCESS,
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
      type: types.USER_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get(`/api/v1/users`, config)

    dispatch({
      type: types.USER_LIST_SUCCESS,
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
      type: types.USER_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.delete(`/api/v1/users/${id}`, config)

    dispatch({
      type: types.USER_DELETE_SUCCESS,
      payload: data
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
      type: types.USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const refreshToken = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_REFRESH_TOKEN_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const refreshToken = userInfo.refreshToken;
    const { data } = await axios.post(`/api/v1/auth/resetToken?token=${refreshToken}`);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    user.accessToken = data.accessToken;
    userInfo.accessToken = data.accessToken
    localStorage.setItem('userInfo', JSON.stringify(user));
    dispatch({
      type: types.USER_REFRESH_TOKEN_SUCCESS,
      payload: data,
    })
    dispatch({
      type: types.USER_UPDATE_TOKEN,
      payload: data.accessToken
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message == "Refresh token has been expinary") {
      dispatch(logout());
    }
    dispatch({
      type: types.USER_REFRESH_TOKEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}