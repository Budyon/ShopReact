import { useEffect, useState } from 'react'
// import { ProductsContext } from '../context/ProductsContext'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import ModalCartContainer from './ModalCart'
import { getSmallImages } from '../utils'
import { getProduct } from '../store/slices/product'
import { useDispatch, useSelector } from 'react-redux'
import { setProductToCart } from '../store/slices/cart'

const ProductContainer = () => {
  const urlParams = new URLSearchParams(window.location.search)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, product } = useSelector((state) => state.product)
  const { productsCart } = useSelector((state) => state.cart)
  const productToCart = productsCart.find((item) => item.id === product.id)

  const id = urlParams.get('id')

  useEffect(() => {
    dispatch(getProduct(parseInt(id)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [count, setCount] = useState(1)

  const handleClickBackButton = () => {
    navigate('/')
  }

  const handleChangeCount = (value) => setCount(prev => (prev += value))

  const handleClickAddToCart = () => {
    
    dispatch(setProductToCart({
      image: product.thumbnail,
      smallImages: getSmallImages(product.images),
      id: product.id,
      title: product.title,
      description: product.description,
      initialPrice: product.price,
      price: product.price * count,
      discountPercentage: product.discountPercentage,
      count: count
    }))
  }

  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  if(isLoading) {
    return <Loader />
  }

  return product.id ? <>
    <ModalCartContainer />
    <Product
      product={product}
      handleClickButton={handleClickBackButton}
      productToCart={productToCart}
      handleChangeCount={handleChangeCount}
      handleClickAddToCart={handleClickAddToCart}
      count={count}
      modalIsOpen={modalIsOpen}
      openModal={openModal}
      closeModal={closeModal}
    />
  </> : null

}

export default ProductContainer