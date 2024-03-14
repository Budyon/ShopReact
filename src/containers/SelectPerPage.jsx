import SelectPerPage from '../components/SelectPerPage'
import { useDispatch, useSelector } from 'react-redux'
import { setPerPage } from '../store/slices/products'

const SelectPerPageContainer = () => {
  const dispatch = useDispatch()
  const perPage = useSelector((state) => state.products.perPage)

  const handleChangePerPage = (event) => {
    dispatch(setPerPage({
      perPage: parseInt(event.value, 10)
    }))
  }

  return (
    <SelectPerPage
      handleChange={handleChangePerPage}
      perPage={perPage}
    />
  )
}

export default SelectPerPageContainer