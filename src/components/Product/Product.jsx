import PropTypes from 'prop-types'
import { FaUserLarge } from "react-icons/fa6"
import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa"
// import { BsThreeDotsVertical } from 'react-icons/bs'
import styled from 'styled-components'
import { save, addToCart, descriptionPrice, countInCart } from '../../variables'
import Calculator from '../Calculator'
import Button from '../Button'
import BackButton from '../BackButton'
import CustomGallery from '../Gallery/index'
import Card from '../Card/index'
import { Tooltip } from 'react-tooltip'
import ModalContainer from '../../containers/Modal'


// const IconDots = styled.div`
//   position: absolute;
//   top: 15px;
//   right: 1%;
//   cursor: pointer;
//   &:hover {
//     background-color: #fee6e6;
//   }
// `

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 40px;

  @media (max-width: 860px) {
    display: block
  }
`

const LeftSideBar = styled.div`
  min-width: 430px;
  display: flex;
  flex: 1;
  display: flex;
  width: 100%;

  .image-gallery-thumbnails-container {
    display: flex;
    justify-content: space-between;
  }

  .image-gallery-thumbnail-image {
    width: 100%;
    height: 100px;
  }

  .image-gallery-thumbnail.active {
    border-radius: 7px;
  }

  .image-gallery-svg {
    height: 40px;
    width: 20px;
  }
`

const RightSideBar = styled.div`
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 3;
  flex: 9;
  padding-bottom: 5px;
  border-bottom: 1px solid #dad4d4;
`

const Header = styled.div``

const Title = styled.p`
  line-height: 1.4;
  max-width: 30ch;
  font-weight: bold;
  font-size: 25px;
  text-align: left;
  margin: 0;
  line-height: 25px;
`

const Brand = styled.p`
  font-weight: bold;
  text-align: start;
  color: #066cdc;
`
const FullPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Price = styled.span`
  line-height: 35px;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  color: #066cdc;
  border-radius: 10px;
  background-color: #c7bfbf82;
`

const ContainerPrice = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
`

const SalePrice = styled.span`
  font-weight: bold;
  text-align: left;
  font-size: 20px;
  color: #066cdc;
`

const DescriptionPrice = styled.span`
  color: #bcb8b0;
  font-size: 13px;
  font-weight: bold;
`

const Description = styled.p`
  max-width: 30ch;
  font-size: 15px;
  text-align: left;
  line-height: 1.5;
`

const ContainerSelect = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`

const Footer= styled.div`
  display: flex;
  flex: 3;
`

const ContainerReview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 3;
`

const ContainerUserAndStar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ContainerUser = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const UserName = styled.span``

const ContainerUserReview = styled.div`
  text-align: start;
`

const Text = styled.p``

const PTwo = styled.p`
  color: #bcb8b0;
  font-size: 12px;
  max-width: 40ch;
`

const Count = styled.div`
  min-height: 45px;
  font-weight: bold;
  font-size: 18px;
  color: #066cdc;
  line-height: 1;
  gap: 5px;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    width: max-content;
  }

  .visit-cart {
    width: max-content;
    color: #bcb8b0;
    font-size: 12px;
  }
`

const DescriptionCount = styled.div``

const Stars = styled.div``

const Product = ({ product, handleClickButton, productToCart, handleChangeCount, count, handleClickAddToCart, closeModal, modalIsOpen }) => ( //openModal
  <Card
    sx={{padding: '40px 40px 40px 40px'}}
    header={
    <BackButton handleClick={handleClickButton}/>
      /* <IconDots
        data-tooltip-id="update-product"
        onClick={openModal}
      >
        <BsThreeDotsVertical/>
      </IconDots> */
    }
  >
    <Tooltip
      id="update-product"
      place="bottom"
      content="Actions"
    />
    <Container>
      <LeftSideBar>
        <CustomGallery product={product} />
      </LeftSideBar>
      <RightSideBar>
        <Main>
          <Header>
            <Title>{product.title}</Title>
            <Brand>BY {(product.brand || product.title).toUpperCase()}</Brand>
          </Header>
          <FullPrice>
            <Price>${Math.floor((product.price - (product.price * product.discountPercentage / 100)))}</Price>
            <ContainerPrice>
              <SalePrice>{save} {Math.floor(product.discountPercentage)}%</SalePrice>
              <DescriptionPrice>{descriptionPrice} </DescriptionPrice>
            </ContainerPrice>
          </FullPrice>
          <Description>{product.description}</Description>
          {!productToCart.count ?
            <ContainerSelect>
              <Calculator count={count} handleChangeCount={handleChangeCount} />
              <Button value={addToCart} handleClick={handleClickAddToCart} />
            </ContainerSelect>
            :
            <Count>
              <DescriptionCount>
                <Text>{countInCart}:</Text>
                <Text>{productToCart.count}</Text>
              </DescriptionCount>
              <Text className='visit-cart'>
                Visit the cart to make changes with this item
              </Text>
            </Count>
          }
        </Main>
        <Footer>
          <ContainerReview>
            <ContainerUserAndStar>
              <ContainerUser>
                <FaUserLarge style={{width: '30px', height: '20px'}} />
                <UserName>
                  Alex Morningstar
                </UserName>
              </ContainerUser>
              <Stars>
                <FaStar style={{color: 'blue'}}/>
                <FaStar style={{color: 'blue'}}/>
                <FaStar style={{color: 'blue'}}/>
                <FaStar style={{color: 'blue'}}/>
                <CiStar/>
              </Stars>
            </ContainerUserAndStar>
            <ContainerUserReview>
              <Text>Contrary to popular belief</Text>
              <PTwo> lorem ipsum is not simply random text. it has roots a pieceOf classical Latin</PTwo>
            </ContainerUserReview>
          </ContainerReview>
        </Footer>
      </RightSideBar>
    </Container>
    {
      modalIsOpen ?
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
      : null
    }
  </Card>
)

Product.propTypes = {
  count: PropTypes.number,
  productToCart: PropTypes.object,
  product: PropTypes.object,
  handleClickButton: PropTypes.func,
  handleChangeCount: PropTypes.func,
  handleClickAddToCart: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  modalIsOpen: PropTypes.bool
}

Product.defaultProps = {
  count: 1,
  productToCart: {},
  modalIsOpen: false,
  handleClickButton: () => { },
  handleChangeCount: () => { },
  handleClickAddToCart: () => { },
  closeModal: () => { },
  openModal: () => { },
  product: {},
}

export default Product