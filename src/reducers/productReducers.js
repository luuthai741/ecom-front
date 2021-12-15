import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  UPDATE_PRODUCT_TOP_REQUEST,
  UPDATE_PRODUCT_TOP_SUCCESS,
  UPDATE_PRODUCT_TOP_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.productsList,
        pages: action.payload.pages,
        currentPage: action.payload.currentPage,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload.data }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { deleteLoading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { deleteLoading: false, deletedSuccess: true, deleteMessage: action.payload }
    case PRODUCT_DELETE_FAIL:
      return { deleteLoading: false, deleteError: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { createLoading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { createLoading: false, createdSuccess: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { createLoading: false, createdError: action.payload }
    case PRODUCT_CREATE_RESET:
      return { product: {}, createdError: '', createdSuccess: false }
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { updateLoading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { updateLoading: false, updateSuccess: true, updateProduct: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { updateLoading: false, updateError: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { product: {}, updateError: '', updateSuccess: false }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const topProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateTopProductReducer = (state = { updateProduct: {} }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_TOP_REQUEST:
      return { updateLoading: true, updateProduct: {} }
    case UPDATE_PRODUCT_TOP_SUCCESS:
      return { updateLoading: false, updateProduct: action.payload }
    case UPDATE_PRODUCT_TOP_FAIL:
      return { updateLoading: false, updateError: action.payload }
    default:
      return { ...state }
  }
}

