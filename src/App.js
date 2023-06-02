import './scss/App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState, lazy, Suspense} from 'react'
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home';
import { Container } from 'react-bootstrap';
import NotFound from './pages/NotFound';
import {UserProvider} from './contexts/UserContext'
import { CartProvider } from './contexts/CartContext';

// Lazy-loaded components
const Products = lazy(() => import('./pages/Products.js'))
const Product = lazy(() => import('./pages/Product.js'))
const Orders = lazy(() => import('./pages/Orders.js'))
const Cart = lazy(() => import('./pages/Cart.js'))
const Register = lazy(() => import('./pages/Register.js'))
const Login = lazy(() => import('./pages/Login.js'))
const Logout = lazy(() => import('./pages/Logout.js'))

function App() {

  // Global states
  const [user, setUser] = useState({
    firstName: localStorage.getItem('firstName'),
    accessToken: localStorage.getItem('accessToken'),
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    regularUser: localStorage.getItem('regularUser')
  })

  const [cart, setCart] = useState([])

  // Global functions
  const unsetUser = () => {
    localStorage.clear()
  }

  const unsetCart = () => {
    setCart([])
  }

  return (
    <React.Fragment>
      <UserProvider value={{user, setUser, unsetUser}}>
      <CartProvider value={{cart, setCart, unsetCart}}>
        <Suspense fallback={"Loading the page..."}>
          <Router>
            <AppNavbar/>
            <Container className="pt-5">
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/products' element={<Products/>}></Route>
                <Route path='/products/:id' element={<Product/>}></Route>
                <Route path='/orders' element={<Orders/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/logout' element={<Logout/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
            </Container>
          </Router>
        </Suspense>
      </CartProvider>
      </UserProvider>
    </React.Fragment>
  )
}

export default App;
