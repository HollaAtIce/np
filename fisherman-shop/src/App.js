import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Content from './components/layout/content'
import Header from './components/layout/header'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header/>
          <Content/>
        </div>
      </Router>
      );
  }
}

export default App;
