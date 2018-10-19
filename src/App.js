import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { load_google_maps, getNightSpots, createInitialMap, createMarkerArray, getSpotDetails } from './util'
import './css/App.css'
import MapContainer from './components/MapContainer'
// import Infowindow from "./components/Infowindow";
// import Sidebar from './components/Sidebar'

class App extends Component {
  state = {
    // staticMap: [],
    // nightSpots: [],
    currentlyShowing: [],
    markers: [],
    onlyOneInfoWindow: null,
    showingInfoWindow: false
  }

  // Code provided by Ryan Waite
  // https://raw.githubusercontent.com/ryanwaite28/script-store/master/js/react_resolve_google_maps.js
  componentDidMount() {

    const googleMapsPromise = load_google_maps()
    const APIdata = getNightSpots()

    Promise.all([googleMapsPromise, APIdata])
      .then(values => {
        this.google = values[0]
        let nightSpots = values[1]
        const spotDetails = getSpotDetails(nightSpots)
        let infowindow = new this.google.maps.InfoWindow({
          content: '',
          maxWidth: 300
        })
        this.setState({ currentlyShowing: nightSpots, onlyOneInfoWindow: infowindow }, () => {
          this.map = createInitialMap()
        })
        this.google.maps.event.addListener(this.map, 'click', () => {
          infowindow.close()
        })
        let [markersArray] = createMarkerArray(spotDetails, this.map, infowindow)
        // this.setState({ markers: markersArray, showingInfoWindow: isInfoWindowOpen }, () => {
        this.setState({ markers: markersArray })
      }).catch(error => {
        console.log(`Promise all produced error: ${error}`)
      })
  }

  individualStateUpdate = (key, value) => {
    this.setState({ key: value })
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
          individualStateUpdate={this.individualStateUpdate}
          state={this.state}
        />
      </div>
    )
  }
}

export default App;
