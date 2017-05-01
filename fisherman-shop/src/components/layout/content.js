import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import fetcher from '../../services/fetcher'

import ProductList from '../productList'
import SideCart from '../sideCart'
import ProductDetail from '../productDetail'
import CartDetail from '../cartDetail'

class Content extends Component {
    state = {
        cart: []
    }

    constructor() {
        super()
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    componentDidMount() {
        this.getCart()
            .then(cart => {
                this.setState({
                    cart: cart[0].products
                })
            })
    }

    render() {
        return (
            <div>
              <Route exact={true} path="/products" render={() => <ProductList addItem={this.addItem}/>} />
              <Route path="/products/:id" render={(props) => <ProductDetail id={ props.match.params.id } addItem={this.addItem}/>} />
              <Route path="/cart" render={() => <CartDetail removeItem={this.removeItem} cart={this.state.cart}/>} />
              <SideCart removeItem={ this.removeItem } cart={ this.state.cart } />
            </div>
        )
    }

    addItem(id) {
        return fetcher.post('cart/add/' + id)
            .then(cart => {
                this.setState({
                    cart: cart.products
                })
            })
    }

    removeItem(id) {
        return fetcher.post('cart/remove/' + id)
            .then(cart => {
                this.setState({
                    cart: this.state.cart.filter(item => item._id !== id)
                })
            })
    }

    getCart() {
        return fetcher.get('cart')
    }
}

export default Content;