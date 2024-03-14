import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { useDispatch, useSelector } from "react-redux"
import { setPage } from '../store/slices/products'

const PaginationContainer = () => {
  const [pageCount, setPageCount] = useState([])
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)

  const handleClickPage = (page) => {
    dispatch(setPage({
      page
    }))
  }

  useEffect(() => {
    const pageCountArr = []
    let i = 1
    while(i <= Math.ceil(products.total / products.perPage)) {
      pageCountArr.push(i);
      i++
    }
    setPageCount(pageCountArr)
  }, [products.perPage, products.total])

  return (
    <Pagination
      pageCount={pageCount}
      currentPage={products.currentPage}
      handleClick={handleClickPage}
    />
  )
}

export default PaginationContainer
