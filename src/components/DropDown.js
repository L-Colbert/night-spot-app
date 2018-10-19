import React, { Component } from 'react'

class DropDown extends Component {
    state = {
        
    }
    
    handleChange = (e) => {
        const selection = e.target.value
        this.props.changeSelection(selection)
    }

    render() {
        return (
            <div className="drop-down-menu">
                <div className="filter-results">
                    Filter Results:
                </div>
                <select onChange={this.handleChange}>
                    <option value="Select a">All Party Spots</option>
                    <option value="Buckhead">Buckhead</option>
                    <option value="Downtown">Downtown</option>
                    <option value="Midtown">Midtown</option>
                    <option value="Little Five Points">Little Five Points</option>
                </select>
            </div>
        )
    }
}

export default DropDown
