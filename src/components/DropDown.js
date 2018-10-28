/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/App.css'


class DropDown extends Component {
    /**
    * Operates on an instance of MyClass and returns something.
    * @param {!MyClass} obj An object that for some reason needs detailed
    *     explanation that spans multiple lines.
    * @param {!OtherClass} obviousOtherClass
    * @return {boolean} Whether something occurred.
    */
    static propTypes = {
        changeSelection: PropTypes.func.isRequired
    }
    /**
     * Demonstrates how top-level functions follow the same rules.  This one
     * makes an array.
     * @param {TYPE} arg
     * @return {!Array<TYPE>}
     * @template TYPE
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
                document.querySelector(".filter").innerHTML="Filter currently unavailable"
                document.querySelector("select").selectedIndex = 0
                alert(error)
            }
        } 
    }

    render() {

        return (
            <div>
                <h2 tabIndex="0" >
                    Search Results:
                </h2>
                <label className="drop-down-menu" htmlFor="select-menu">Filter By Neighborhood:</label>
                <select id="select-menu" onChange={(e) => this.handleChange(e)} >
                    <option value="Select a">All Party Spots</option>
                    <option value="Buckhead">Buckhead</option>
                    <option value="Downtown">Downtown</option>
                    <option value="Little Five Points">Little Five Points</option>
                    <option value="Midtown">Midtown</option>
                </select>
                <p className="filter"></p>
            </div>
        )
    }
}

export default DropDown
