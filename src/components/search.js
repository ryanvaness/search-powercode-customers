import React, { Component } from 'react'

class Search extends Component {    
    render() {
        return (
            <div className="row search-box">
                <div className="col-md-12 show-grid">
                    <form id="searchForm" onSubmit={(e) => this.props.onSubmit(e) }>
                        <div className="col-md-12">
                            <div className="input-group stylish-input-group">
                                <input type="text" className="form-control" placeholder="Search" id="searchString" name="searchString" autoFocus />
                                <span className="input-group-addon">
                                    <button type="submit">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Search;