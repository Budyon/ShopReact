import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/products'
import productSlice from './slices/product'
import cartSlice from './slices/cart'

const store = configureStore({
  reducer: {
    products: productsSlice,
    product: productSlice,
    cart: cartSlice
  }
})

export default store