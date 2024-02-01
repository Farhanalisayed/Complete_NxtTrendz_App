import {FiSearch} from 'react-icons/fi'
import {ImCart} from 'react-icons/im'
import {IoPersonCircleSharp} from 'react-icons/io5'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            <span className="cart-count-badge">{cartList.length}</span>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <h1 className="logo">
          SHOP<span className="heading-span">LANE</span>
        </h1>

        <ul className="nav-routes">
          <li classNane="link">HOME</li>
          <li classNane="link">CLOTHINGS</li>
          <li classNane="link">ACCESSORIES</li>
        </ul>

        <ul className="nav-menu">
          <li className="nav-menu-item">
            <FiSearch />
          </li>

          <li className="nav-menu-item">
            <ImCart />
            {renderCartItemsCount()}
          </li>

          <li className="nav-menu-item">
            <IoPersonCircleSharp />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
