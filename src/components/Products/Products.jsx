import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { addToCart } from '../../variables'
import Button from '../Button'
import Card from '../Card'
import SearchContainer from '../../containers/Search'
import SelectPerPageContainer from '../../containers/SelectPerPage'
import Loader from '../Loader'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, auto);
  @media (max-width: 1240px) {
    grid-template-columns: repeat(2, auto)
  }
  @media (max-width: 942px) {
    grid-template-columns: repeat(1, auto)
  }

  ${(props) => props.$isLoading && css`
    opacity: 0.5;
  `}
`

const Select = styled.div`
  right: 5px;
`

const Header = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  justify-content: space-between;
  padding: 10px;

  @media (max-width: 942px) {
    ${Select} {
      position: unset;
    }
    flex-direction: column;
  }
`

const Item = styled.div`
  text-align: center;
  width: 360px;
  height: 492px;
  background-color: white;
  color: black;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #dadada;
`

const Title = styled.p`
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 25px;
  text-align: left;
  padding: 25px;
  line-height: 25px;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
`

const Image = styled.div`
  width: 360px;
  height: 209px;
  background-image: ${
    props => props.src.indexOf("'")
    ? `url(${props.src.replace(/'/g, "%27")})`
    : `url(${props.src})`
  };
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const Description = styled.p`
  width: 310px;
  height: 100px;
  overflow: hidden;
`

const Price = styled.del`
  color: red;
  font-size: 18px;
  font-weight: bold;
`

const DiscountPercentage = styled.span`
  font-size: 15px;
  font-weight: bold;
`

const Footer = styled.div`
  justify-content: space-evenly;
  display: flex;
  align-items: center;
`

const Main = styled.div`
  padding: 25px;
`

const FullPrice = styled.div`
  display: flex;
  align-items: center;
  gap:5px;
`

export const ProductsNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
`

export const NotFoundIcon = styled.div`
  svg {
    height: 150px;
    width: 150px;
  }
`

const Search  =styled.div`
  display: flex;
`

export const NotFoundText = styled.div``

const Products = ({ products, handleClick, handleClickButtonOrder, isLoading }) => products.length ? (
  <Card header={
    <Header>
      <Search>
        <SearchContainer />
      </Search>
      <Select>
        <SelectPerPageContainer />
      </Select>
    </Header>
  }>
    <>
    {isLoading ? <Loader/> : null}
    <Container $isLoading={isLoading}>
      {products.map((product, key) => (
        <Item
          key={key}
          onClick={() => handleClick(product.id)}
        >
          <Title>{product.title}</Title>
          <Image
            src={product.thumbnail} >
          </Image>
          <Main>
            <Description>{product.description}</Description>
          </Main>
          <Footer>
            <FullPrice>
              <DiscountPercentage>${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</DiscountPercentage>
              <Price>${product.price}</Price>
              <Button
                value={addToCart}
                handleClick={(e) => {
                  e.stopPropagation()
                  handleClickButtonOrder(product)
                }}
              />
            </FullPrice>
          </Footer>
        </Item>
      ))}
    </Container>
    </>
  </Card>
) : null

Products.propTypes = {
  isLoading: PropTypes.bool,
  handleClickButtonOrder: PropTypes.func,
  hasRequest: PropTypes.bool,
  products: PropTypes.array,
  handleClick: PropTypes.func,
}

Products.defaultProps = {
  handleClickButtonOrder: () => { },
  hasRequest: false,
  isLoading: false,
  products: [],
  handleClick: () => { }
}


export default Products