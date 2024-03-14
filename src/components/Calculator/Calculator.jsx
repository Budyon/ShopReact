import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button`
  border: none;
  text-align: center;

  &:hover {
    color: #61a4df;
    transition: 0.25s;
  }
`

const Input = styled.input`
  text-align: center;
  border: none;
  border-radius: 8px;
  width: 20px;
`

const Calculator = ({ handleChangeCount, count }) => (
  <Container className='calculator'>
    <Button className='button-calculator' disabled={count <= 1} onClick={() => handleChangeCount(-1)}>-</Button>
    <Input disabled value={count} onChange={() => {}} />
    <Button className='button-calculator' onClick={() => handleChangeCount(1)}>+</Button>
  </Container>
)

Calculator.propTypes = {
  count: PropTypes.number,
  handleChangeCount: PropTypes.func,
}

Calculator.defaultProps = {
  count: 1,
  handleChangeCount: () => { },
}

export default Calculator