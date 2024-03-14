import { IoMdClose } from 'react-icons/io'
import { MdDelete } from "react-icons/md"
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../Button'
import { update } from '../../variables'

const Container = styled.div``

const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`

const Label = styled.label`
  font-weight: bold;
`

const Input = styled.input.attrs({maxLength: 10})`
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 25px;
  border: 1px solid #3498db;
  outline: none;
  font-size: 13px;
`

const Delete = styled.div`
  position: absolute;
  right: 35px;
  top: 8px;
  cursor: pointer;
`

const ButtonClose = styled.button`
  position: absolute;
  right: 5px;
  top: 8px;
`

const ModalComponent = ({ modalIsOpen, closeModal, handleChangeTitle, handleChangeBrand, handleClick, customStyles, handleDeleteProduct }) => (
  <Modal
    isOpen={modalIsOpen}
    style={customStyles}
    ariaHideApp={false}
    onRequestClose={closeModal}
  >
    <Container>
      <Delete
        onClick={handleDeleteProduct}
      >
        <MdDelete/>
      </Delete>
      <ButtonClose
        onClick={closeModal}>
        <IoMdClose/>
      </ButtonClose>
      <ContainerInput>
        <Label>Title</Label>
        <Input
          onChange={handleChangeTitle}
        />
        <Label>Brand</Label>
        <Input
          onChange={handleChangeBrand}
        />
        <Button
          value={update}
          handleClick={() => handleClick()}
        />
      </ContainerInput>
    </Container>
  </Modal>
)

ModalComponent.propTypes = {
  modalIsOpen: PropTypes.bool,
  customStyles: PropTypes.object,
  closeModal: PropTypes.func,
  setUpdated: PropTypes.func,
  handleChangeTitle: PropTypes.func,
  handleChangeBrand: PropTypes.func,
  handleClick: PropTypes.func,
  handleDeleteProduct: PropTypes.func
}

ModalComponent.defaultProps = {
  modalIsOpen: false,
  customStyles: PropTypes.object,
  setUpdated: () => { },
  closeModal: () => { },
  handleChangeTitle: () => { },
  handleChangeBrand: () => { },
  handleClick: () => { },
  handleDeleteProduct: () => { }
}

export default ModalComponent