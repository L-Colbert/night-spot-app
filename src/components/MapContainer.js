import React, { Component } from 'react'
import '../css/App.css'
// import { createInitialMap } from '../util'

// import Infowindow from './Infowindow'
// import propTypes from 'Prop-types'



class MapContainer extends Component {
      /**
   * Operates on an instance of MyClass and returns something.
   * @param {!MyClass} obj An object that for some reason needs detailed
   *     explanation that spans multiple lines.
   * @param {!OtherClass} obviousOtherClass
   * @return {boolean} Whether something occurred.
   */
    // state = {
    //     markers: []
    // }

    render() {

        return (
            <main role="main">
                <div>
                    <div
                        id="map"
                        role="application"
                        onClick={this.mapClicked}>
                        {/* <img src={this.props.copyOfMapAtl} alt="map" /> */}
                    </div>
                </div>
            </main >
        )
    }
}

export default MapContainer