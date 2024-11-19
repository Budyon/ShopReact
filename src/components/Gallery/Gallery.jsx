import Gallery from "react-image-gallery"
import styled from "styled-components"
import PropTypes from 'prop-types'
import "react-image-gallery/styles/scss/image-gallery.scss"
import "react-image-gallery/styles/css/image-gallery.css"

const Container = styled.div`
  .image-gallery-thumbnails-container {
    display: flex;
    justify-content: space-between;
  }

  .image-gallery-thumbnail-image {
    width: 100%;
    height: 100px;
  }

  .image-gallery-image {
    width: 430px;
    height: 350px;
    object-fit: fill;
    border-radius: 2%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .image-gallery-svg {
    height: 40px;
    width: 20px;
  }

  .image-gallery-thumbnail.active, .image-gallery-thumbnail:focus {
    background-color: #00000012;
    border: unset !important;
  }

  .image-gallery-thumbnail:hover {
    border: 4px solid #00000012;
  }

  button.image-gallery-thumbnail {
    transition: none;
  }
`

const CustomGallery = ({ product }) => (
  <Container>
    <Gallery
      items={product.smallImages}
      showPlayButton={false}
      showFullscreenButton={false}
    />
  </Container>
)

CustomGallery.propTypes = {
  product: PropTypes.object,
}

CustomGallery.defaultProps = {
  product: {},
}

export default CustomGallery