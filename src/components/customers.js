import React from "react";
import Icon from "./icon";

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            powercode: props
        };
    }

    state = {};

    render() {
        return (
            <div className="pcInstance panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Customers from</h3>
                    <div className="pull-right">
                        <span
                            className="clickable filter"
                            title="Toggle table filter"
                            onClick={this.toggleFilter}
                        >
                            <Icon name="funnel" fill="#111" size="23" />
                        </span>
                    </div>
                </div>
                <div className="panel-body">
                    <input
                        type="text"
                        className="filter-table form-control"
                        id="customer-table-filter"
                        placeholder="Filter Customers"
                    />
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address 1</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="search-sf">
                            <td className="text-muted" colSpan="4">
                                No entries found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Customers.propTypes = {
    // customers: PropTypes.object.isRequired
};

export default Customers;
