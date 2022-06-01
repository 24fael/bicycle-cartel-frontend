import './scss/App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react'
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home';
import Products from './pages/Products';
import { Container } from 'react-bootstrap';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import {UserProvider} from './contexts/UserContext'
import Product from './pages/Product';

function App() {

  const [user, setUser] = useState({
    accessToken: localStorage.getItem('accessToken'),
    isAdmin: localStorage.getItem('isAdmin') === 'true'
  })

  const unsetUser = () => {
    localStorage.clear()
  }

  return (
    <React.Fragment>
      <UserProvider value={{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar/>
          <Container>
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/products' element={<Products/>}></Route>
              <Route path='/products/:id' element={<Product/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/logout' element={<Logout/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
          </Routes>
          </Container>
        </Router>
      </UserProvider>
    </React.Fragment>
  )
}

export default App;
