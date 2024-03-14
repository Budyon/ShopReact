
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsContainer from './containers/Products'
import ProductContainer from './containers/Product'
import CartContainer from './containers/Cart'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <Routes>
      <Route path="/" element={<ProductsContainer /> }/>
      <Route path='product' element={<ProductContainer />} />
      <Route path='cart' element={<CartContainer />} />
    </Routes>
  </Provider>
  </BrowserRouter>
)