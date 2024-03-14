import PropTypes from 'prop-types'
import Select from 'react-select'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Text = styled.p``

const options = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 }
]

const SelectPerPage = ({ handleChange, perPage }) =>  (
  <Container>
    <Text>
      Perpage:
    </Text>
  <Select
    defaultValue={{value: perPage, label: perPage}}
    isSearchable={false}
    onChange={handleChange}
    options={options}
    hideSelectedOptions={true}
    />
    </Container>
)

SelectPerPage.propTypes = {
  perPage: PropTypes.number,
  handleChange: PropTypes.func
}

SelectPerPage.defaultProps = {
  perPage: 0,
  handleChange: () => { }
}



export default SelectPerPage