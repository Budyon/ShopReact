import { useState } from "react"
import ModalCart from "../components/ModalCart"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProductsPriceToCart, getProductsCountToCart } from "../store/slices/cart"

const ModalCartContainer = () => {
  const dispatch = useDispatch()
  const productsCart = useSelector((state) => state.cart.productsCart)

  const [modalIsOpen, setIsOpen] = useState (false)
  const navigate = useNavigate()

  const toggleModal = () => {
    setIsOpen(!modalIsOpen)
  }

  const handleClick = () => {
    navigate(`${`/cart`}`)
  }

  return (
    <ModalCart
      dispatch={dispatch}
      modalIsOpen={modalIsOpen}
      onToggle={toggleModal}
      productsCart={productsCart}
      getProductsPriceToCart={getProductsPriceToCart}
      getProductsCountToCart={getProductsCountToCart}
      handleClick={handleClick}
    />
  )
}

export default ModalCartContainer