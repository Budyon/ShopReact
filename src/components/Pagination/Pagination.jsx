import styled, { css } from "styled-components"
import PropTypes from 'prop-types'

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1%;
  padding-top: 10px;
`

const Item = styled.a`
  color: white;
  font-size: 20px;
  cursor: pointer;
  float: left;
  text-decoration: none;
  border-radius: 50%;
  background-color: transparent;
  line-height: 1;
  width: 15px;
  height: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;

  &:hover {
    color: #8c8c8c !important;
    border-color: #8c8c8c !important;
  }

  ${(props) => props.$active && css`
    color: #8c8c8c;
    border-color: #8c8c8c;
  `}
`
const Pagination = ({pageCount, currentPage, handleClick }) => (
  <Container>
    {pageCount.map((number, key) => (
      <Item
        $active={currentPage === key + 1}
        key={key}
        onClick={() => handleClick(number)} href="#"
      >
        {number}
      </Item>
    ))}
  </Container>
)

Pagination.propTypes = {
  pageCount: PropTypes.array,
  currentPage: PropTypes.number,
  handleClick: PropTypes.func
}

Pagination.defaultProps = {
  pageCount: [],
  currentPage: 0,
  handleClick: () => { }
}

export default Pagination