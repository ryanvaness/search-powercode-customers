import React from 'react'
import Search from './components/search'
import Customers from './components/customers'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    submit = (data) => {
        fetch('http://172.17.255.8:8001/apiCall.php', {
            method: 'post',
            'Content-Type': 'application/json',
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => this.setState({results: data}))
            .catch((err) => console.error('err', err));
    };

    render() {
        return (
            <div className="container-fluid">
                <Search submit={this.submit}/>
                <Customers values={this.state.results}/>
            </div>
        )
    }
}

export default App;