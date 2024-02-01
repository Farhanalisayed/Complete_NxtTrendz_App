import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, image, price, id} = productData

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={image} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="price">Rs {price}/-</p>
      </Link>
    </li>
  )
}
export default ProductCard
