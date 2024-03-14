
import { createSlice } from '@reduxjs/toolkit'
import store from '..'

const cardSlice = createSlice({
  name: 'cart',
  initialState: {
    isLoading: false,
    productsCart: [],
  },
  reducers: {
    setProductToCart: (state, action) => {
      const product = state.productsCart.find((product) => product.id === action.payload.id)
      if(!product) {
        state.productsCart.push(action.payload)
      } else {
        product.count = product.count + 1
        product.price = product.count * product.initialPrice
      }
    },
    setProductCount: (state, action) => {
      const product = state.productsCart.find((item) => item.id === action.payload.productId)
      product.count = action.payload.count + product.count
      product.price = product.count * product.initialPrice
    },
    removeProductToCart: (state, action) => {
      state.productsCart = state.productsCart.filter((item) => item.id !== action.payload.productId)
    }
  },
  selectors: {
    getProductsPriceToCart: state => {
      return state.productsCart.reduce((prev, current) => {
        const price = current.price - (current.price * current.discountPercentage / 100)
        return prev += price
      },0).toFixed(2)
    },
    getProductsCountToCart: state => {
      return state.productsCart.reduce((prev, current) => prev += current.count,0)
    }
  }
})

export const { setProductToCart, setProductCount, removeProductToCart } = cardSlice.actions
export const cardSelector = () => store.getState().cart
export const { getProductsPriceToCart, getProductsCountToCart } = cardSlice.getSelectors(cardSelector)

export default cardSlice.reducer