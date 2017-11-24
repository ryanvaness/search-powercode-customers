import React from "react";
import PropTypes from "prop-types";
import Customers from "./customers";

const Powercodes = function Powercodes(props) {
    const { powercodes } = props;
    return (
        <div className="row">
            <div className="col-md-12">
                <div id="powercodes">
                    {powercodes.map(v => (
                        <Customers key={v.name} powercode={v} />
                    ))}
                </div>
            </div>
        </div>
    );
};

Powercodes.propTypes = {
    powercodes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Powercodes;
