import React, { Component } from 'react'
import '../css/App.css'
// import { createInitialMap } from '../util'

// import Infowindow from './Infowindow'
// import propTypes from 'Prop-types'



class MapContainer extends Component {
    state = {
        markers: []
    }

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