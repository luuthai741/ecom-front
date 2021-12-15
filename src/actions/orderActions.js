import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import * as types from '../constants/orderConstants'
import { refreshToken, logout } from './userActions'
const BASE_URL = "http://localhost:8080"

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_CREATE_REQUEST,
    })
    console.log(order);
    const { data } = await axios.post(`${BASE_URL}/api/v1/order`, order)
    console.log(data);
    dispatch({
      type: types.ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR_ITEMS
    })
    localStorage.removeItem('cartItems')
    localStorage.removeItem('customer')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('shippingAddress')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: types.ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}
export const orderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get(`/api/v1/order/${id}`, config)
    console.log(data);
    dispatch({
      type: types.ORDER_DETAILS_SUCCESS,
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
      type: types.ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get(`/api/v1/order?userId=${userInfo.id}`, config)

    dispatch({
      type: types.ORDER_LIST_MY_SUCCESS,
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
      type: types.ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listOrders = (keyword, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get(`/api/v1/order/admin?keyword=${keyword}&page=${page}`, config)
    dispatch({
      type: types.ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error.response);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message.startsWith('JWT expired')) {
      dispatch(refreshToken());
    }
    dispatch({
      type: types.ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.delete(`/api/v1/order/${id}`, config)
    console.log(data);
    dispatch({
      type: types.ORDER_DELETE_SUCCESS,
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
      type: types.ORDER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateOrder = (update) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.put(`/api/v1/order`, update, config)
    dispatch({
      type: types.ORDER_UPDATE_SUCCESS,
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
      type: types.ORDER_UPDATE_FAIL,
      payload: message,
    })
  }
}

