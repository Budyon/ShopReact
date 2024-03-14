import Item from "../../components/Item"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeProductToCart, setProductCount } from "../../../../store/slices/cart"

const ItemContainer = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChangeCount = (value) => {
    dispatch(setProductCount({
      count: value,
      productId: product.id
    }))
  }

  const handleClickRemove = () => (
    dispatch(removeProductToCart({
      productId: product.id
    }))
  )

  const handleClickItem = (id) => {
    navigate(`${`/product?id=${id}`}`, { replace: true })
  }

  return (
    <Item
      handleClickRemove={handleClickRemove}
      product={product}
      handleChangeCount={handleChangeCount}
      handleClickItem={handleClickItem}
    />
  )
}

ItemContainer.propTypes = {
  product: PropTypes.object,
}

ItemContainer.defaultProps = {
  product: {},
}

export default ItemContainer