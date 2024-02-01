// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const amountList = cartList.map(each => each.price * each.quantity)
      const amount = amountList.reduce((acc, addOn) => acc + addOn)

      return (
        <div>
          <h1>
            Order Total: <span>{amount}/-</span>
          </h1>
          <p>{cartList.length} Items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
