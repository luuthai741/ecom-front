import axios from 'axios'
import * as types from '../constants/cartConstants'
import cartUtils from '../utils/cartUtils';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`)
  dispatch({
    type: types.CART_ADD_ITEM,
    payload: {
      id: id,
      name: data.name,
      imageName: data.imageName,
      imageURL: data.imageURL,
      price: data.price,
      quantity: data.quantity,
      qty: parseInt(qty),
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const updateCartItem = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: types.CART_UPDATE_ITEM,
    payload: {
      id: id,
      qty: parseInt(qty),
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: types.CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: types.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  cartUtils.setShippingAddress(data);
}

export const savePaymentMethod = (data) => (dispatch, getState) => {
  dispatch({
    type: types.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })
  cartUtils.setPaymentMethod(data, getState().cart.paymentMethod);
}

export const saveCustomer = data => (dispatch, getState) => {
  dispatch({
    type: types.CART_SAVE_CUSTOMER,
    payload: data
  })
  cartUtils.setCustomer(getState().cart.customer);
}