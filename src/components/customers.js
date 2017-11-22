import React, { Component } from 'react';

class Customers extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="customers">
                        { Object.keys(this.props.values).map( (v, i) => console.log(this.props.values[v]) ) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Customers;