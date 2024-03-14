import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Input = styled.input`
  width: 30vw;
  min-width: 340px;
  padding: 15px;
  border: none;
  border-radius: 25px;
  border-bottom: 2px solid #3498db;
  outline: none;
  font-size: 13px;
`

const Search = ({ handleSearch, value }) => (
  <Container>
    <Input
      type='search'
      placeholder='Search products'
      onChange={handleSearch}
      value={value}
    />
  </Container>
)

Search.propTypes = {
  handleSearch: PropTypes.func,
  value: PropTypes.string,
}

Search.defaultProps = {
  handleSearch: () => {},
  value: ''
}

export default Search