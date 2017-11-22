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
    
    submit = (data) => {
        console.log(data)
        this.setState({
            results: {
                one: [1,2,3,4,5,6],
                two: [9,8,7,6,5,4]
            } 
        })
    };

    render() {
        return (
            <div className="container-fluid">
                <Search submit={this.submit} />
                <Customers values={this.state.results} />
            </div>
        )
    }
}

export default App;