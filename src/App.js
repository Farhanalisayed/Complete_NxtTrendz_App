import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state

    const theProduct = cartList.find(each => each.id === product.id)
    if (theProduct !== undefined) {
      const index = cartList.indexOf(theProduct)
      let theQuantity = cartList[index].quantity
      theQuantity += 1
      const updatedProd = {...cartList[index], quantity: theQuantity}
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (product.id === each.id) {
            return updatedProd
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState(prevState => {
      const theProduct = cartList.find(each => each.id === id)
      const index = cartList.indexOf(theProduct)
      let theQuantity = cartList[index].quantity
      theQuantity += 1
      const updatedProd = {...cartList[index], quantity: theQuantity}
      return {
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return updatedProd
          }
          return each
        }),
      }
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    this.setState(prevSt => {
      const theProduct = cartList.find(each => each.id === id)
      const index = cartList.indexOf(theProduct)
      let theQuantity = cartList[index].quantity
      if (theQuantity >= 1) {
        theQuantity -= 1
      }
      const updatedProd = {...cartList[index], quantity: theQuantity}
      return {
        cartList: prevSt.cartList.map(each => {
          if (each.id === id) {
            return updatedProd
          }
          return each
        }),
      }
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
