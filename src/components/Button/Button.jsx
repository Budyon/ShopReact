import styled from "styled-components"
import PropTypes from 'prop-types'

const ButtonOrder = styled.button`
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
  color: white;
  font-weight: bold;
  width: 150px;
  height: 45px;
`

const Button = ({ value, handleClick, sx }) => (
  <ButtonOrder style={sx} onClick={handleClick}>{value}</ButtonOrder>
)

Button.propTypes = {
  value: PropTypes.string,
  handleClick: PropTypes.func,
  sx: PropTypes.object,
}

Button.defaultProps = {
  value: '',
  handleClick: () => { },
  sx: null
}

export default Button