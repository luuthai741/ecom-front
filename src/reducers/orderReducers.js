import * as types from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case types.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case types.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case types.ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case types.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case types.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case types.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case types.ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case types.ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,

      }
    case types.ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case types.ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case types.ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case types.ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        pages: action.payload.pages,
        currentPage: action.payload.currentPage,
      }
    case types.ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ORDER_DELETE_REQUEST:
      return {
        loading: true,
      }
    case types.ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      }
    case types.ORDER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}


export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ORDER_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case types.ORDER_UPDATE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case types.ORDER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

