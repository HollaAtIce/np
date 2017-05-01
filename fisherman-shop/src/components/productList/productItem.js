import React from 'react';
import AddToCart from '../common/addToCart'
import { Link } from 'react-router-dom'
const ProductItem = (props) => (
  <div className="col-sm-6 col-md-3">
    <div className="well text-center">
      <Link to={ "/products/" + props.item._id }>
        <span className="h4">{ props.item.name }</span>
        <img className="product-item_image" src={ props.item.image } alt={ props.item.name } />
      </Link>
      <AddToCart addItem={ props.addItem } item={ props.item } />
    </div>
  </div>
);

export default ProductItem;