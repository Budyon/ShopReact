import { useEffect, useState } from 'react'
import Search from '../components/Search'
import useDebounceEffect from '../hooks/useDebounceEffect'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../store/slices/products'

const SearchContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state) => state.products.searchQuery)

  const [ value, setValue] = useState(searchQuery)

  const handleSearch = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
  }, [dispatch, value])

  useDebounceEffect(() => {
      dispatch(setSearch({
        value
      }))
  }, [value, dispatch, setSearch], 800)

  return (
    <Search
      handleSearch={handleSearch}
      value={value}
    />
  )
}

export default SearchContainer