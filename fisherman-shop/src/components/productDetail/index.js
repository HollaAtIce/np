import React, { Component } from 'react';
import fetcher from '../../services/fetcher'
import './productDetail.css'

import AddToCart from '../common/addToCart'

class ProductDetail extends Component {
    state = {  }

    constructor() {
        super()
        this.addItem = this.addItem.bind(this)
    }

    componentDidMount() {
        this.getProduct()
            .then(product => {
                this.setState({product})
            })
    }

    render() {
        return this.state.product? (
            <div className="row">
                <div className="col-sm-5">
                    <img className="product-detail_image" src={this.state.product.image} alt={this.state.product.name}/>
                </div>
                <div className="col-sm-7 text-center">
                    <div className="well">
                        <h3>{this.state.product.name}</h3>
                        <p>{this.state.product.description}</p>
                        <AddToCart addItem={this.addItem} item={this.state.product}/>
                    </div>
                </div>
            </div>
        ) : null
    }

    getProduct() {
        return fetcher.get('products/' + this.props.id)
    }

    addItem(ev) {
        this.props.addItem(ev.target.dataset.id)
    }
}

export default ProductDetail;