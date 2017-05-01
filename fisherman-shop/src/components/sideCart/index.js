import React, {Component} from 'react';
import Cart from '../common/cart'
import './sideCart.css'

class SideCart extends Component {
    state = {  }
    render() {
        return (
            <Cart {...this.props}/>
        );
    }
}

export default SideCart;