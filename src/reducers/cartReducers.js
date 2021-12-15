import * as types from '../constants/cartConstants'
import cartUtils from '../utils/cartUtils'
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: '', customer: {} },
  action
) => {
  let item = null;
  let existItem = null;
  switch (action.type) {
    case types.CART_ADD_ITEM:
      item = action.payload;

      if (state.cartItems.length > 0) {
        for (let i = 0; i < state.cartItems.length; i++) {
          if (state.cartItems[i].id === item.id) {
            existItem = state.cartItems[i];
          }
        }
      }
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? { ...x, qty: x.qty += item.qty } : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case types.CART_UPDATE_ITEM:
      item = action.payload;
      if (state.cartItems.length > 0) {
        for (let i = 0; i < state.cartItems.length; i++) {
          if (state.cartItems[i].id === item.id) {
            existItem = state.cartItems[i];
          }
        }
      }
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? { ...x, qty: x.qty = item.qty } : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case types.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload)
      }
    case types.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case types.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case types.CART_SAVE_CUSTOMER:
      return {
        ...state,
        customer: action.payload
      }
    case types.CART_CLEAR_ITEMS:

      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
