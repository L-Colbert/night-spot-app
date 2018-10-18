import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { load_google_maps, getNightSpots, createInitialMap, createMarkerArray } from './util'
import './css/App.css'
import MapContainer from './components/MapContainer'
// import Infowindow from "./components/Infowindow";

// import Sidebar from './components/Sidebar'

class App extends Component {
  state = {
    // staticMap: [],
    nightSpots: [],
    currentlyShowing: [],
    markers: []
  }

  // Code provided by Ryan Waite
  // https://raw.githubusercontent.com/ryanwaite28/script-store/master/js/react_resolve_google_maps.js
  componentDidMount() {

    let googleMapsPromise = load_google_maps()
    let APIdata = getNightSpots()

    Promise.all([googleMapsPromise, APIdata])
      .then(values => {
        let google = values[0]
        let nightSpots = values[1]
        
        this.infowindow = new google.maps.InfoWindow({
          content: `libby`
        })
        this.setState({ nightSpots, currentlyShowing: nightSpots }, () => {
          this.map = createInitialMap()
          let markersArray = createMarkerArray(nightSpots, this.map, this.infowindow)
          this.setState({ markers: markersArray }, () => {
            console.log(this.state.markers)
          })
        })


      })
      .catch(error => {
        console.log(`Promise all produced error: ${error}`)
      })
  }

  render() {

    return (
      <div className="App" >
        <header role="banner" className="App-header">
          <h1>
            Party On!
          </h1>
        </header>
        <nav>
          {/* <Sidebar
            currentlyShowing={this.state.currentlyShowing}
            changeSelection={this.changeSelection}
            individualStateUpdate={this.individualStateUpdate}
            state={this.state}
            updateState={this.updateState}
          /> */}
        </nav>
        <MapContainer
          closeInfoWindow={this.closeInfoWindow}
          // createArrayOfMarkers={this.createArrayOfMarkers}
          // individualStateUpdate={this.individualStateUpdate}
          openInfoWindow={this.openInfoWindow}
          // updateMarkers={this.updateMarkers}
          state={this.state}
        />
      </div>
    )
  }
}

export default App;
