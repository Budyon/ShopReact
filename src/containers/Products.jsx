import { useEffect } from 'react'
import Products from "../components/Products"
import { useLocation, useNavigate } from 'react-router-dom'
import PaginationContainer from './Pagination'
import SearchContainer from './Search'
import { productNotFound } from '../variables'
import { RxValueNone } from "react-icons/rx"
import { NotFoundText, NotFoundIcon, ProductsNotFound } from '../components/Products/Products'
import ModalCartContainer from './ModalCart'
import { getSmallImages } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/slices/products'
import { setProductToCart } from '../store/slices/cart'

const ProductsContainer = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { products, currentPage, searchQuery, perPage, hasRequest, isLoading } = useSelector((state) => state.products)
  const navigate = useNavigate()

  const handleClickProduct = (id) => {
    navigate(`${`/product?id=${id}`}`, { replace: true })
  }

  const handleClickButtonOrder = (product) => {

    dispatch(setProductToCart({
      image: product.thumbnail,
      smallImages: getSmallImages(product.images),
      id: product.id,
      title: product.title,
      description: product.description,
      initialPrice: product.price,
      price: product.price,
      discountPercentage: product.discountPercentage,
      count: 1
    }))
  }

  useEffect(() => {
    dispatch(getProducts())
    const params = new URLSearchParams(location.search)
    if (currentPage) {
      params.set('page', currentPage)
    }

    params.set('search', searchQuery)
    if(!searchQuery) {
      params.delete('search')
    }

    if (perPage) {
      params.set('perPage', perPage)
    }

    navigate(`/?${params.toString()}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPage, searchQuery, perPage])

  if(!hasRequest) return null

  else if(!products.length) {
    return (
      <>
      <SearchContainer />
      <ProductsNotFound>
        <NotFoundText>{productNotFound}</NotFoundText>
        <NotFoundIcon>
          <RxValueNone />
        </NotFoundIcon>
      </ProductsNotFound>
      </>
    )
  }

  return <>
    <ModalCartContainer />
    <Products isLoading={isLoading} products={products}  handleClick={handleClickProduct} handleClickButtonOrder={handleClickButtonOrder} />
    <PaginationContainer />
  </>
}

export default ProductsContainer