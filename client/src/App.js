import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './views/HomeScreen'
import ProductScreen from './views/ProductScreen'
import CartScreen from './views/CartScreen'
import LoginScreen from './views/LoginScreen'
import RegisterScreen from './views/RegisterScreen'
import ProfileScreen from './views/ProfileScreen'
import ShippingScreen from './views/ShippingScreen'
import PaymentScreen from './views/PaymentScreen'
import PlaceOrderScreen from './views/PlaceOrderScreen'
import OrderScreen from './views/OrderScreen'
import UserListScreen from './views/UserListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userList' component={UserListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
