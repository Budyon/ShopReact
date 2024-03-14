import { RiArrowLeftSLine } from 'react-icons/ri'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const IconContainer = styled.div`
  height: 25px;
  width: 25px;
  position: absolute;
  top: 10px;
  left: 1%;
  color: #61a4df;
  cursor: pointer;
  transition: .25s all;

  &:hover {
    background-color: #fee6e6;
  }

  svg {
    width: 100%;
    height: 100%;
    outline: 0;
  }
`

const BackButton = ({ handleClick }) => (
  <IconContainer className='icon-back' onClick={() => handleClick()}>
    <RiArrowLeftSLine data-tooltip-id="back-to-list" />
    <Tooltip
      id="back-to-list"
      place="bottom"
      content="Back to list"
    />
  </IconContainer>
)

BackButton.propTypes = {
  handleClick: PropTypes.func,
}

BackButton.defaultProps = {
  handleClick: () => { },
}

export default BackButton