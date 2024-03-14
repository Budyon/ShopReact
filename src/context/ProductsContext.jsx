import { createContext, useEffect, useReducer } from 'react'
import  PropTypes  from 'prop-types'
import { initialState, productsReducer } from '../reducer/ProductsReducer'
import { SET_CURRENT_PAGE, SET_HAS_REQUEST, SET_LOADING, SET_PAGE, SET_PRODUCT, SET_PRODUCTS }  from '../actions'
import { useNavigate } from 'react-router-dom'

const ProductsContext = createContext(null)

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState)
  const navigate = useNavigate()

  const getProducts = () => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    })
    fetch(`https://dummyjson.com/products/search?q=${state.searchQuery}&limit=${state.perPage}&skip=${( state.page - 1) * state.perPage}`)
    .then(response => response.json())
    .then(response => {
        dispatch({
          type: SET_PRODUCTS,
          payload:{
            total: response.total,
            products: response.products,
          }
        })
    })
    .finally(() => {
      dispatch({
        type: SET_LOADING,
        payload: false
      })
      dispatch({
        type: SET_HAS_REQUEST,
        payload: true
      })
    })
  }

  const updateProduct = (title, brand) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    })
    fetch(`https://dummyjson.com/products/${state.product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        brand,
      })
    })
    .then(res => res.json())
    .then(product => {
      const smallImages = []
      product.images.forEach((item, key) => {
        if(key < 3) {
          smallImages.push({
            original: item,
            thumbnail: item,
          })
        }
      })
      dispatch({
        type: SET_PRODUCT,
        payload: {
          product,
          smallImages
        }
      })
    })
      .finally(() => {
        dispatch({
          type: SET_LOADING,
          payload: false,
        })
      })
  }

  const deleteProduct = () => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    })
    fetch(`https://dummyjson.com/products/${state.product.id}`, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(
      dispatch({
        type: SET_PRODUCT,
        payload: []
      })
    ).finally(() => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      })
      navigate('/')
    });
  }

  useEffect(() => {
    if (state.current) {
      state.current = false
      return
    }

    dispatch({ type: SET_PAGE, payload: 1})
    dispatch({ type: SET_CURRENT_PAGE, payload: 1})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchQuery])

  const getProduct = (id) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    })
      fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(product => {

        const smallImages = []
        product.images.forEach((item, key) => {
          if(key < 3) {
            smallImages.push({
              original: item,
              thumbnail: item,
            })
          }
        })
        dispatch({
          type: SET_PRODUCT,
          payload: {
            product,
            smallImages
          }
        })
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING,
          payload: false,
        })
      })
  }

  const getProductCount = (productId) => {
    const product = state.productsCart.find((item) => item.id === productId)
    return product ? product.count : 0
  }

  const getProductsPriceToCart = () => state.productsCart.reduce((prev, current) => {
    const price = current.price - (current.price * current.discountPercentage / 100)
      return prev += price
  },0)

  const getProductsCountToCart = () => state.productsCart.reduce((prev, current) => prev += current.count,0)

    return (
    <ProductsContext.Provider value={{
      dispatch,
      perPage: state.perPage,
      total: state.total,
      products: state.products,
      isLoading: state.isLoading,
      hasRequest: state.hasRequest,
      searchQuery: state.searchQuery,
      page: state.page,
      currentPage: state.currentPage,
      product: state.product,
      getProduct,
      getProducts,
      updateProduct,
      deleteProduct,
      productsCart: state.productsCart,
      getProductCount,
      getProductsPriceToCart,
      getProductsCountToCart,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

ProductsProvider.propTypes = {
  children: PropTypes.object
}

ProductsProvider.defaultProps = {
  children: []
  }

export { ProductsProvider, ProductsContext }