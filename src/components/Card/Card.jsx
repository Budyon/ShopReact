import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;

  .react-tooltip {
    z-index: 1;
  }
`

const Body = styled.div`
  /* min-width: 796px; */
  padding: 0 40px 40px 40px;
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: max-content;
  height: max-content;
  text-align: center;
  background-color: floralwhite;
  color: black;
  border-radius: 8px;
  margin: 0 auto;
  min-width: max-content;
`

const Card = ({ children, header, sx }) => (
  <Container>
    <Header>{header}</Header>
    <Body style={sx}>{children}</Body>
  </Container>
)

Card.propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  sx: PropTypes.object,
  st: PropTypes.object
}

Card.defaultProps = {
  children: null,
  header: null,
  sx: null,
  st: null
}

export default Card