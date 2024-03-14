import styled from "styled-components"
import PropTypes from 'prop-types'
import Calculator from "../Calculator"
import { MdDelete } from "react-icons/md"
import BackButton from "../BackButton"
import { Tooltip } from "react-tooltip"
import CustomGallery from "../Gallery/Gallery"
import Card from "../Card"
import Button from "../Button/Button"

const HeaderBodyContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  div {
    margin: 0;
  }
  flex-wrap: wrap;
`

const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 5px;
`

const Item = styled.div`
  display: flex;
  height: 155px;
  gap: 5px;
  border: 1px solid #dadada;
  border-radius: 8px;
  padding: 10px;

  .image-gallery-slide-wrapper {
    min-width: 304px;
  }

  .image-gallery-thumbnail-image {
    width: 35px;
    height: 35px;
  }

  .image-gallery-image {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 2%;
    background-repeat: no-repeat;
    background-position: center;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 10px;
`

const Main = styled.div`
  display: flex;
  height: 74%;
  width: 100%;
  justify-content: space-between;
`

const LeftSideBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: start;
  height: 100%;

  .button-calculator {
    border-radius: 8px;
    width: 40px;
  }

  .calculator {
    gap: 5px;
  }
`

const TitleAndDescription = styled.div``

const RightSideBar  = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 191px;
  text-align: start;
  margin: 0;
`

const Description = styled.p`
  text-align: start;
  max-width: 400px;
  font-size: 14px;
  margin: 0;
`

const Remove = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  text-align: center;
  justify-content: end;

  &:hover {
    color: gray;
    transition: 0.5s;
    cursor: pointer;
  }
`

const PriceAndActionContainer = styled.div``

const Price = styled.del`
  color: red;
  font-size: 12px;
  text-align: center;
`
const SalePrice = styled.span`
  font-weight: bold;
  font-size: 14px;
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  text-align: start;
  width: 65px;
`

const RightContainer = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Text = styled.p`
  font-size: 13px;
  font-family: cursive;
`

const TextTwo = styled.p`
  font-weight: bold;
`

const ItemsPrice = styled.div`
  display: flex;
  justify-content: space-between;
`

const Cart = ({ productsCart, handleClickBack, handleChangeCount, handleClickRemove, getProductsPriceToCart, productsToCartCount }) => (
  <HeaderBodyContainer>
    <Card header={
    <Header>
      <BackButton handleClick={handleClickBack}/>
    </Header>}>
    <Container>
      {productsCart.map((product, key) => (
        <Item key={key}>
          <CustomGallery product={product}/>
          <Main>
            <LeftSideBar>
              <TitleAndDescription>
                <Title>{product.title}</Title>
                <Description>{product.description}</Description>
              </TitleAndDescription>
              <Calculator count={product.count} handleChangeCount={(value) => handleChangeCount(product.id, value)} />
            </LeftSideBar>
            <RightSideBar>
              <Remove data-tooltip-id="remove-product"  onClick={() => handleClickRemove(product.id)}>
                <MdDelete/>
                <Tooltip
                  id="remove-product"
                  place="bottom"
                  content="Remove"
                />
              </Remove>
              <PriceAndActionContainer>
                <PriceContainer>
                  <Price>${product.price}</Price>
                  <SalePrice>${Number.parseFloat(product.price - (product.price * product.discountPercentage / 100)).toFixed(product.price / 100000 >= 1 ? 0 : 2)}</SalePrice>
                </PriceContainer>
              </PriceAndActionContainer>
            </RightSideBar>
          </Main>
        </Item>
      ))}
    </Container>
</Card>
<Card sx={{padding: '10px 10px'}}>
    <RightContainer>
    <Button sx={{width: '450px', height: '45px'}}value={'PROCEED TO CHECKOUT'} ></Button>
      <Text>Have a Promotional Code? Proceed to checkout to redeem it.</Text>
      <TextTwo>Bag Summary ({productsToCartCount} Items)</TextTwo>
      <ItemsPrice>
        <Text>Subtotal ({productsToCartCount} items)</Text>
        <SalePrice>${getProductsPriceToCart()}</SalePrice>
      </ItemsPrice>
    </RightContainer>
</Card>
  </HeaderBodyContainer>
)

Cart.propTypes = {
  productsCart: PropTypes.array,
  handleClickBack: PropTypes.func,
  handleChangeCount: PropTypes.func,
  getProductCount: PropTypes.func,
  handleClickRemove: PropTypes.func,
  getProductsPriceToCart: PropTypes.func,
  productsToCartCount: PropTypes.number
}

Cart.defaultProps = {
  productsCart: [],
  handleClickBack: () => { },
  handleChangeCount: () => { },
  getProductCount: () => { },
  handleClickRemove: () => { },
  getProductsPriceToCart: () => { },
  productsToCartCount: null
}

export default Cart