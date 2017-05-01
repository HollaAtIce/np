import React, { Component } from 'react';
import Cart from '../common/cart'
console.log(Cart)

class CartDetail extends Component {
    state = {  }
    render() {
        return (
            <Cart {...this.props} prefix='detail-cart'/>
        );
    }
}

export default CartDetail;