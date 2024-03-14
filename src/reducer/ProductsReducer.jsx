import {
  SET_SEARCH,
  SET_CURRENT_PAGE,
  SET_LOADING,
  SET_PAGE,
  SET_PER_PAGE,
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_HAS_REQUEST,
  SET_PRODUCT_TO_CART,
  SET_PRODUCT_COUNT,
  SET_UPDATED_PRODUCT_TO_CART
}  from '../actions'

const urlParams = new URLSearchParams(window.location.search)

export const initialState = {
  products: [],
  isLoading: true,
  searchQuery: urlParams.get('search') || '',
  page: parseInt(urlParams.get('page')) || 1,
  currentPage: parseInt(urlParams.get('page')) || 1,
  total: 0,
  perPage: parseInt(urlParams.get('perPage')) || 10,
  current: true,
  product: {},
  product_id: urlParams.get('id') || '',
  hasRequest: false,
  productsCart: [],
}

export const productsReducer = (state, action) => {

  switch (action.type) {
    case SET_SEARCH: {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_HAS_REQUEST: {
      return {
        ...state,
        hasRequest: action.payload,
      }
    }
    case SET_PRODUCTS: {
      return {
        ...state,
        ...action.payload,
        product: {}
      }
    }
    case SET_PRODUCT: {
      return {
        ...state,
        product: {...action.payload.product, smallImages: action.payload.smallImages}
      }
    }
    case SET_PRODUCT_TO_CART: {
      return {
        ...state,
        productsCart: [...state.productsCart, action.payload]
      }
    }
    case SET_UPDATED_PRODUCT_TO_CART: {
      return {
        ...state,
        productsCart: [...action.payload]
      }
    }
    case SET_PRODUCT_COUNT: {
      const product = state.productsCart.find((item) => item.id === action.payload.productId)
        product.count = action.payload.count
        product.price = product.count * product.initialPrice

      return {
        ...state,
        productsCart: [
          ...state.productsCart,
        ]
      }
    }
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case SET_PER_PAGE: {
      return {
        ...state,
        perPage: action.payload,
        page: 0,
        currentPage: 1,
      };
    }
    default: {
      return state
    }
  }
}