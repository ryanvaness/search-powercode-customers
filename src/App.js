import React, { Component } from 'react'
import Search from './components/search'
import Customers from './components/customers'

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Search />
                <Customers />
            </div>
        );
    }
}

export default App;