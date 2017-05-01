import React from 'react';

const addToCart = (props) => (
    <a className="btn btn-info center-block" onClick={props.addItem} data-id={props.item._id}>Add To Cart</a>
);

export default addToCart;