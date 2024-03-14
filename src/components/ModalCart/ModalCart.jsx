import PropTypes from 'prop-types'
import { SlArrowUp, SlArrowDown } from 'react-icons/sl'
import styled, { css } from 'styled-components'
import { GiShoppingCart } from "react-icons/gi"
import ItemContainer from './containers/Item'
import { itemsToCart, price, count } from '../../variables'
import { BsBoxArrowInRight } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'

const Header = styled.div`
  .react-tooltip {
    z-index: 1;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .svg {
    outline: 0 !important;
    width: 20px;
    height: 20px;
  }
`

const HeadingTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Modal = styled.div.attrs({id: 'modal'})`

  border-radius: 8px 8px 0 0;
  transition: height .25s;
  height: 44px;
  width: 360px;
  display: flex;
  text-align: end;
  position: fixed;
  bottom: 0;
  right: 5px;
  background-color: white;
  cursor: pointer;
  flex-direction: column;
  z-index: 2;

  ${Header} {
    border-radius: 8px 8px 0 0;
    background-color: #c9c9c9;
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-body {
    display: flex;
    max-height: 680px;
    flex: 10;
    padding: 10px;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    width: 18px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }

  ${(props) => props.$open && css`
    height: 800px !important;
  `
}
`

const ModalBody = styled.div``

const Footer = styled.div`
  display: flex;
  flex: 1;
  box-shadow: rgba(149, 157, 165, 0.2) 0px -5px 24px;
  gap: 10px;
`

const TotalContainer = styled.div`
  padding: 10px;
  width: 100%;
`

const Total = styled.div`
  justify-content: space-between;
  display: flex;
  width: 100%;
  font-weight: bold;
`

const Text = styled.p``

const CountAndIconContainer = styled.div`
  display: flex;
  gap: 10px;

  ${Text} {
    color: white;
    font-size: 10px;
    background-color: #8c8c8c;
    border-radius: 10px;
    padding: 5px;
    font-weight: bold;
    width: 20px;
    height: 15px;
    position: absolute;
    top: -10px;
    left: -10px;
  }
`

const Price = styled.p``

const Count = styled.p``

const HeadingText = styled.span``

const ModalCart = ({ onToggle, modalIsOpen, productsCart, getProductsPriceToCart, getProductsCountToCart, handleClick }) => (
  <Modal $open={modalIsOpen}>
    <Header onClick={onToggle}>
      <HeadingTextContainer>
        <GiShoppingCart/>
        <HeadingText>{itemsToCart}</HeadingText>
      </HeadingTextContainer>
      <ActionsContainer>
      {modalIsOpen && productsCart.length ? <BsBoxArrowInRight className='svg' onClick={() => handleClick() } offset="{'left': 500}" data-tooltip-id='go-to-cart' /> : null }
      {modalIsOpen  ? <SlArrowDown data-tooltip-id='close-modal'/> : <CountAndIconContainer> {productsCart.length ? <Text>{productsCart.length}</Text> : null }  <SlArrowUp/></CountAndIconContainer> }
      <Tooltip
        id="go-to-cart"
        place="bottom"
        content="Open cart"
      />
      <Tooltip
        id="close-modal"
        place="bottom"
        content="Close"
      />
      </ActionsContainer>
    </Header>
      {
        modalIsOpen ? (
          <ModalBody className='modal-body customized-scrollbar'>
            {productsCart.map((item, key) => (
              <ItemContainer key={key} product={item} />
            ))}
          </ModalBody>
        ) : null
      }
      <Footer>
        <TotalContainer>
          <Total>
            <Price>{price}:</Price>
            ${getProductsPriceToCart()}
          </Total>
          <Total>
            <Count>{count}:</Count>
            {getProductsCountToCart()}
          </Total>
        </TotalContainer>
      </Footer>
  </Modal>
)


ModalCart.propTypes = {
  modalIsOpen: PropTypes.bool,
  productsCart: PropTypes.array,
  product: PropTypes.object,
  onToggle: PropTypes.func,
  getProductsPriceToCart: PropTypes.func,
  getProductsCountToCart: PropTypes.func,
  handleClick: PropTypes.func,
}

ModalCart.defaultProps = {
  productsCart: [],
  product: {},
  onToggle: () => {},
  getProductsPriceToCart: () => { },
  handleClick: () => { },
  getProductsCountToCart: () => { },
  modalIsOpen: false,
}

export default ModalCart