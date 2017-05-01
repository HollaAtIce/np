import React, { Component } from 'react';
import ProductItem from './productItem'
import fetcher from '../../services/fetcher'
import './productList.css'

class ProductList extends Component {
    state = {  }

    constructor() {
        super()
        this.addItem = this.addItem.bind(this)
    }

    componentDidMount() {
        this.fetchProducts()
            .then(products => {
                this.setState({products})
            })
    }   
    
    render() {
        return this.state.products? (
            <div>
              <div className="row">
                  {this.state.products.map(product => (<ProductItem key={product._id} item={product} addItem={this.addItem}/>))}
              </div>
            </div>
            ) : (null)
    }
    
    fetchProducts() {
        return fetcher.get('products')
    }

    addItem(ev) {
        this.props.addItem(ev.target.dataset.id)
    }
}

export default ProductList;