import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import store from '../'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { getState }) => {
    const { searchQuery, perPage, page } = getState().products
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}&limit=${perPage}&skip=${(page ? page - 1 : 0) * perPage}`)
    const data = await response.json()
    return data
  },
)

const urlParams = new URLSearchParams(window.location.search)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isLoading: false,
    searchQuery: urlParams.get('search') || '',
    page: parseInt(urlParams.get('page')) || 1,
    currentPage: parseInt(urlParams.get('page')) || 1,
    total: 0,
    perPage: parseInt(urlParams.get('perPage')) || 10,
    current: true,
    hasRequest: false,
  },
  reducers: {
    setSearch: (state, action) => {
      if(state.searchQuery !== action.payload.value) {
        state.currentPage = 1
        state.page = 1
      }
      state.searchQuery = action.payload.value
    },
    setPage: (state, action) => {
      state.page = action.payload.page
      state.currentPage = action.payload.page
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload.perPage
      state.page = 0
      state.currentPage = 1
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true
    })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = [...action.payload.products]
        state.total = action.payload.total
        state.hasRequest = true
        state.isLoading = false
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  getProductsPriceToCart,
  getProductsCountToCart,
  setSearch,
  setPage,
  setPerPage
} = productsSlice.actions

export const cardSelector = () => store.getState().cart
export const { getProductCount } = productsSlice.getSelectors(cardSelector)

export default productsSlice.reducer
