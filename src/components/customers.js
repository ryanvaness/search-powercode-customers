import React  from 'react';
import PropTypes from 'prop-types';

const Customers = function Customers(props) {
    const { customers } = props;
    return (
        <div className="row">
            <div className="col-md-12">
                <div id="customers">
                    { customers.map((v) => console.log(v)) }
                </div>
            </div>
        </div>
    );
}

Customers.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Customers;