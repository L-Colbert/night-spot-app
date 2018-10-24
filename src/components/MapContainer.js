import React, { Component } from 'react'
import '../css/App.css'
// import { createInitialMap } from '../util'

// import Infowindow from './Infowindow'
// import propTypes from 'Prop-types'



/**
* Operates on an instance of MyClass and returns something.
* @param {!MyClass} obj An object that for some reason needs detailed
*     explanation that spans multiple lines.
* @param {!OtherClass} obviousOtherClass
* @return {boolean} Whether something occurred.
*/
class MapContainer extends Component {
    render() {
        return (
                    <div
                        id="map"
                        // role="application"
                        // aria-label="location"
                        >
                        {/* <img src={this.props.copyOfMapAtl} alt="map of Atlanta, GA" /> */}
                    </div>
        )
    }
}

export default MapContainer