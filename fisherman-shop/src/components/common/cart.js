import React, { Component } from 'react';
import CartItem from './cartItem'
import fetcher from '../../services/fetcher'

class Cart extends Component {
    state = {
        open: false
    }

    constructor() {
        super()
        this.toggleCart = this.toggleCart.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    render() {
        const prefix = this.props.prefix || 'side-cart'
        return this.props.cart? (
            <div className={ prefix + (this.state.open ? '' : ' in') }>
              {prefix !== 'side-cart'? 
              null 
              :<div className={`${prefix}_toggle`} onClick={ this.toggleCart }>
                { this.state.open ? 'X' : 'O' }
              </div>}
              <h2 className={`${prefix}_title`}>Your Cart: </h2>
              <ul className="list-unstyled">
                { this.props.cart.map(item => (<CartItem key={ item.id } item={ item } removeItem={this.removeItem}/>)) }
              </ul>
            </div>
            ) : null
    }

    toggleCart() {
        this.setState({
            open: !this.state.open
        })
    }

    removeItem(ev) {
        this.props.removeItem(ev.target.dataset.id)
    }


}

export default Cart;