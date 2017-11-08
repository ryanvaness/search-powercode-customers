import React, { Component } from 'react';

class Customers extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="customers">
                        {console.log(this.props.values)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Customers;