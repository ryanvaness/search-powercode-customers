import React, { Component } from 'react'
import Search from './components/search'
import Customers from './components/customers'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results : []
        }
        
    }
    
    handleSearch(e) {
        e.preventDefault()
        console.log('submitted!');
        this.setState({
            results: {
                one: [1,2,3,4,5,6],
                two: [9,8,7,6,5,4]
            } 
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <Search onSubmit={(e) => this.handleSearch(e)} />
                <Customers values={this.state.results}/>
            </div>
        );
    }
}

export default App;