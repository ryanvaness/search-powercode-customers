import React, {Component} from 'react';
import PropTypes from 'prop-types';
import magGlass from '../assets/icons/magnifying-glass.svg'

class Search extends Component {
    state = {
        data: {
            searchString: ''
        },
        loading: false
    };

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = (e) => {
        e.preventDefault();
        if (!!this.state.data.searchString) {
            this.props.submit(this.state.data);
        }
    };

    render() {
        return (
            <div className="row search-box">
                <div className="col-md-12 show-grid">
                    <form id="searchForm" className="form-inline" onSubmit={ this.onSubmit }>
                        <div className="input-group col-md-12">
                            <input type="text" className="form-control" placeholder="Search" id="searchString" name="searchString" autoFocus onChange={ this.onChange }/>
                            <span className="input-group-addon">
                                <button type="submit" className="btn btn-default" style={{background: 'transparent'}}>
                                    <img src={magGlass} style={{height: 23}} alt="Search"/>
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    submit: PropTypes.func.isRequired
};

export default Search;