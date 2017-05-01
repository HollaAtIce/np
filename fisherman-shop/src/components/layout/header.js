import React from 'react';
import { Link, withRouter } from 'react-router-dom'

const Header = (props) => {
  const {location} = props

  function isDetail() {
    if(location.pathname.indexOf('/products') === 0 && location.pathname.length === 34) return 'active'
  }

  function isActive(path) {
    if(location.pathname === path) return 'active'
    return ''
  }

  return (
    <div className="jumbotron">
      <h1 className="display-2">Let's shop!</h1>
      <ul className="nav nav-pills">
        <li role="presentation" className={isActive('/products')}>
          <Link to='/products'>Home</Link>
        </li>
        <li role="presentation" className={isActive('/cart')}>
          <Link to='/cart'>Cart</Link>
        </li>
        { isDetail() ? (<li role="presentation" className="active"><a>Detail</a></li>) : null }
      </ul>
    </div>
  )
}


export default withRouter(Header);