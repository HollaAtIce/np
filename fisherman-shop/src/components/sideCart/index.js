import React, {Component} from 'react';
import Cart from '../common/cart'
import './sideCart.css'

class SideCart extends Component {
    state = {  }
    render() {
        return (
            <Cart {...this.props}>
                <div className="side-cart_quantity">{this.props.cart.length}</div>
            </Cart>
        );
    }
}

export default SideCart;