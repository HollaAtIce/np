import React from 'react';

const SideCartItem = (props) => (
    <li className="side-cart_item">
      <img className="cart-item_photo" src={ props.item.image } alt="product" />
      <span className="h6">{ props.item.name }</span>
      <span className="cart-item_remove"><a onClick={props.removeItem} data-id={props.item._id}>Remove</a></span>
    </li>
)

export default SideCartItem;