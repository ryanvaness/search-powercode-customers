import React  from 'react';

class Customers extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="customers">
                        { this.props.values.map( (v, i) => console.log(v) ) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Customers;