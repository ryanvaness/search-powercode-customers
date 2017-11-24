import React from "react";
import PropTypes from "prop-types";

const icons = {
    funnel:
        "M10,1C5.092,1,2,2.512,2,4.001v2c0,0.918,6,6,6,6v6c-0.001,0.684,1,1,2,1s2.001-0.316,2-1v-6 c0,0,6-5.082,6-6v-2C18,2.512,14.908,1,10,1z M10,6.123C6.409,6.122,3.862,4.79,3.862,4.292C3.86,3.797,6.41,2.461,10,2.463 c3.59-0.002,6.14,1.334,6.138,1.828C16.138,4.79,13.591,6.122,10,6.123z",
    "magnifying-glass":
        "M17.545,15.467l-3.779-3.779c0.57-0.935,0.898-2.035,0.898-3.21c0-3.417-2.961-6.377-6.378-6.377  C4.869,2.1,2.1,4.87,2.1,8.287c0,3.416,2.961,6.377,6.377,6.377c1.137,0,2.2-0.309,3.115-0.844l3.799,3.801  c0.372,0.371,0.975,0.371,1.346,0l0.943-0.943C18.051,16.307,17.916,15.838,17.545,15.467z M4.004,8.287  c0-2.366,1.917-4.283,4.282-4.283c2.366,0,4.474,2.107,4.474,4.474c0,2.365-1.918,4.283-4.283,4.283  C6.111,12.76,4.004,10.652,4.004,8.287z"
};

const Icon = function Powercodes(props) {
    const { name, fill, stroke, size } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${size}px`}
            height={`${size}px`}
            viewBox={`0 0 ${size} ${size}`}
            fill={fill}
            stroke={stroke}
        >
            <path d={icons[name]} />
        </svg>
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    size: PropTypes.string
};

Icon.defaultProps = {
    fill: "#000",
    stroke: "transparent",
    size: "20"
};

export default Icon;
