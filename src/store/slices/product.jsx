import { createAsyncThunk } from '@reduxjs/toolkit'

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await response.json()
    return data
  }
)

export const getProductCount = (state, productId) => {
  const product =  state.productsCart.find((item) => item.id === productId)
  return product ? product.count : 0
}

const urlParams = new URLSearchParams(window.location.search)
import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    isLoading: true,
    product: {},
    product_id: urlParams.get('id') || '',
  },

  reducers: {
    getProductCount: (state, productId) => {
      const product =  state.productsCart.find((item) => item.id === productId)
      return product ? product.count : 0
    }
  },
  extraReducers: (builder) => {
      builder.addCase(getProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        const smallImages = []
        state.product = {...action.payload, smallImages}
        state.product.images.forEach((item, key) => {
          if(key < 3) {
            smallImages.push({
              original: item,
              thumbnail: item,
            })
          }
        })
        state.total = action.payload.total
        state.hasRequest = true
        state.isLoading = false
      })
      .addCase(getProduct.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const { getProductsPriceToCart, getProductsCountToCart } = productSlice.actions

export default productSlice.reducer
