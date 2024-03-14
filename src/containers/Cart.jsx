import Cart from '../components/Cart'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeProductToCart, setProductCount, getProductsPriceToCart, getProductsCountToCart } from '../store/slices/cart'
import { useEffect } from 'react'

const CartContainer = () => {
  const dispatch = useDispatch()
  const { productsCart } = useSelector((state) => state.cart)
  const productsToCartCount = getProductsCountToCart()
  const navigate = useNavigate()

  useEffect(() => {
    if(!productsCart.length){
      navigate('/')
    }
  })

  const handleClickBack = () => {
    navigate('/')
  }

  const handleChangeCount = (productId, value) => dispatch(setProductCount({
    productId,
    count: value
  }))

  const handleClickRemove = (productId) => {
    dispatch(removeProductToCart({
      productId
    }))
  }

  return (
    productsCart.length ?
    <Cart
      productsCart={productsCart}
      handleClickBack={handleClickBack}
      handleChangeCount={handleChangeCount}
      handleClickRemove={handleClickRemove}
      getProductsPriceToCart={getProductsPriceToCart}
      productsToCartCount={productsToCartCount}
    />
    : null
  )
}

export default CartContainer