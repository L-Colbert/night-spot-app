import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/App.css'


class DropDown extends Component {
    /**
     *  Renders the drop down menu
    */
    static propTypes = {
        changeSelection: PropTypes.func.isRequired
    }
    /**
     * Function using input via input form and 
     * filters result list of venues
     */
    handleChange = (e) => {
        if (e.target.value) {
            try {
                if (this.props.changeSelection) {
                    this.props.changeSelection(e.target.value)
                } else {
                    throw new Error('Sorry, filtering is unavailable.')
                }
            } catch (error) {
                document.querySelector("select").setAttribute("disabled", "")
                document.querySelector(".filter-error").innerHTML="Filter currently unavailable"
                document.querySelector("select").selectedIndex = 0
                alert(error)
            }
        } 
    }

    render() {

        return (
            <div className="filter">
                <h3 tabIndex="0" >
                    Search Results
                </h3>
                <label className="drop-down-menu" htmlFor="select-menu">Filter By Neighborhood:</label>
                <select id="select-menu" onChange={(e) => this.handleChange(e)} >
                    <option value="Select a">All Party Spots</option>
                    <option value="Buckhead">Buckhead</option>
                    <option value="Downtown">Downtown</option>
                    <option value="Little Five Points">Little Five Points</option>
                    <option value="Midtown">Midtown</option>
                </select>
                <p className="filter-error"></p>
            </div>
        )
    }
}

export default DropDown
