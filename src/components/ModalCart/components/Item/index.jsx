import PropTypes from 'prop-types'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdDelete } from "react-icons/md"
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'
import { remove } from '../../../../variables'
import Calculator from '../../../Calculator'
import ClickAwayListener from 'react-click-away-listener';
import { useState } from 'react'

const Container = styled.div`
  display: flex;
  gap: 5px;
  position: relative;
  height: 50px;

  .action-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    height: max-content;
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex: 3;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const TitleAndDescriptionContainer = styled.div`
  display: flex;
  flex: 5;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: start;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  width: 191px;
  text-align: start;
  font-size: 10px;
  margin: 0;
`

const PriceAndActionContainer = styled.div`
  display: flex;
  flex: 4;
  justify-content: space-evenly;
`

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

const ActionModal = styled.div`
  /* display: none; */
  height: max-content;
  border-radius: 8px;
  top: 20px;
  position: absolute;
  width: 130px;
  background-color: white;
  right: 0;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  z-index: 1;
`

const Action = styled.div``

const ActionsContainer = styled.div`
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid #b69b9b;
`

const Remove = styled.div`

  &:hover {
    color: gray;
    transition: 0.5s;
  }

  align-items: center;
  display: flex;
  gap: 5px;
  flex: 1;
  width: 100%;
  text-align: center;
`
const RemoveText = styled.p`
  font-weight: bold;
  font-size: 12px;
`

const Item = ({ product, handleChangeCount, handleClickRemove, handleClickItem }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container
      onClick={() => handleClickItem(product.id)}
    >
      <ImageContainer >
        <Image src={product.image} />
      </ImageContainer>
      <TitleAndDescriptionContainer>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
      </TitleAndDescriptionContainer>
      <PriceAndActionContainer>
        <PriceContainer>
          <Price>${(product.price).toFixed(2)}</Price>
          <SalePrice>
            ${Number.parseFloat(product.price - (product.price * product.discountPercentage / 100)).toFixed(product.price / 100000 >= 1 ? 0 : 2)}
          </SalePrice>
        </PriceContainer>
        <Action
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        >
          <BsThreeDotsVertical
            style={{outline: 0}}
            data-tooltip-id="actions"
          />
          <Tooltip
            id="actions"
            place="bottom"
            content="Actions"
          />
        </Action>
      </PriceAndActionContainer>
      <ClickAwayListener
        onClickAway={() => setIsOpen(false)}
      >
        {
          isOpen ? (
            <ActionModal
              className='action-modal'
              onClick={(e) => {
                e.stopPropagation()
              }}
              id={product.id}>
              <ActionsContainer>
                <Remove
                  onClick={() => handleClickRemove()
                  }
                >
                  <MdDelete/>
                  <RemoveText>{remove}</RemoveText>
                </Remove>
              </ActionsContainer>
              <Calculator
                count={product.count}
                handleChangeCount={handleChangeCount}
              />
            </ActionModal>
          ) : <></>
        }
      </ClickAwayListener>
    </Container>
  )
}

Item.propTypes = {
  handleClickAction: PropTypes.func,
  handleChangeCount: PropTypes.func,
  handleClickRemove: PropTypes.func,
  handleClickItem: PropTypes.func,
  product: PropTypes.object,
}

Item.defaultProps = {
  handleClickAction: () => { },
  handleClickRemove: () => { },
  handleChangeCount: () => { },
  handleClickItem: () => { },
  product: {},
}

export default Item