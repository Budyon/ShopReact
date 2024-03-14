import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { ProductsContext } from '../context/ProductsContext'
import ModalComponent from '../components/Modal/Modal'

const ModalContainer = ({modalIsOpen, closeModal}) => {

  const customStyles = {
    content: {
      display: 'flex',
      justifyContent: 'center',
      height: '250px',
      width: '300px',
      top: '50%',
      left: '50%',
      borderRadius: '8px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  const { updateProduct, deleteProduct, product } = useContext(ProductsContext)
  const [title, setTitle] =  useState(product.title)
  const [brand, setBrand] = useState(product.brand)

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeBrand = (e) => {
    setBrand(e.target.value)
  }

  const handleClick = () => {
    if(title !== product.title || brand !== product.brand) {
      updateProduct(title, brand)
      closeModal()
    }
    return
  }

  const handleDeleteProduct = () => {
    deleteProduct()
  }

  return (
    <ModalComponent
      handleChangeTitle={handleChangeTitle}
      handleChangeBrand={handleChangeBrand}
      handleClick={handleClick}
      handleDeleteProduct={handleDeleteProduct}
      modalIsOpen={modalIsOpen}
      customStyles={customStyles}
      closeModal={closeModal}
    />
  )
}

ModalContainer.propTypes = {
  modalIsOpen: PropTypes.bool,
  closeModal: PropTypes.func
}

ModalContainer.defaultProps = {
  modalIsOpen: false,
  closeModal: () => { }
}

export default ModalContainer