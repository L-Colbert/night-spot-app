import React, { Component } from 'react'
import '../css/App.css'
// import Infowindow from './Infowindow'
// import propTypes from 'Prop-types'



class MapContainer extends Component {
    state = {
        markers: []
    }

    mapClicked = () => {
        if (this.props.state.showingInfoWindow) {
            this.props.closeInfoWindow()
        }
    }

    onClose = () => {
        this.props.closeInfoWindow()
    }


    render() {

        return (
            <main role="main">
                <div>
                    <div id="map" role="application">
                        {/* <img src={this.props.copyOfMapAtl} alt="map" /> */}
                            {/* <InfoWindow
                                maxWidth={100}
                                marker={this.props.state.activeMarker}
                                onClose={() => this.onClose}
                                visible={this.props.state.showingInfoWindow}>
                                <Infowindow selectedPlace={this.props.state.selectedPlace} />
                            </InfoWindow> */}
                    </div>
                </div>
            </main >
        )
    }
}

export default MapContainer