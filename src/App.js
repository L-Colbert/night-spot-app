/**
 * @fileoverview Main application file
 * containing the map and sidebar component
 */

import React, { Component } from 'react'
import { load_google_maps, getNightSpots, createInitialMap } from './util'
import { setNeighborhood, createNeighborhoodBounds, panToNeighborhoodBounds, createMarkerArray, getSpotDetails, createInfoWindow } from './util'
import './css/App.css'
import Sidebar from './components/Sidebar'
import ErrorHandling from './components/ErrorHandling'
import Footer from './components/Footer'
import party from './img/party.jpg'

class App extends Component {
  state = {
    // staticMap: [],
    currentlyShowing: [],
    onlyInfoWin: null,
    showingInfoWindow: false
  }

  // adapted from code graciously provided by Ryan Waite
  // https://raw.githubusercontent.com/ryanwaite28/script-store/master/js/react_resolve_google_maps.js
  /**
 * Before commponent is mounted, load google maps and 
 * optain third party data
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
  componentDidMount() {

    const googleMapsPromise = load_google_maps()
    const APIdata = getNightSpots()

    Promise.all([googleMapsPromise, APIdata])
      .then(values => {
        this.google = values[0]
        this.nightSpots = values[1]
        this.neighborhoodBounds = createNeighborhoodBounds()
        this.nightSpots = setNeighborhood(this.neighborhoodBounds, this.nightSpots)
        const spotDetails = getSpotDetails(this.nightSpots)
        this.infowindow = createInfoWindow()
        this.map = createInitialMap(this.infowindow)
        this.allMarkers = createMarkerArray(spotDetails, this.map, this.infowindow)
        this.setState({ currentlyShowing: spotDetails, onlyInfoWin: this.infowindow /*, visibleMarkers: this.allMarkers*/ })
      }).catch(error => {
        console.log(`Promise all produced error: ${error}`)
      })
  }

  /**
  * Used to update state 
   */
  individualStateUpdate = (key, value) => {
    this.setState({ key: value })
  }

  /**
   * Takes a user inputed neighborhood 
   * and filters the map markers and results list, 
   * then updates currentlyShowwing in state
   */
  changeSelection = (selectedValue) => {
    panToNeighborhoodBounds(selectedValue, this.neighborhoodBounds, this.map)
    this.infowindow.marker = null
    this.infowindow.close()
    this.infowindow.setContent('')

    const holder = this.nightSpots.filter(spot =>
      spot.neighborhood === selectedValue)

    this.allMarkers.forEach(marker => {
      marker.setVisible(false)
    })

    if (selectedValue === "Select a") {
      this.setState({ currentlyShowing: this.nightSpots })
      this.allMarkers.forEach(marker => {
        marker.setVisible(true)
        this.map.setZoom(9)
      })
    } else if (holder.length === 0) {
      this.allMarkers.forEach(marker => {
        marker.setVisible(false)
        this.setState({ currentlyShowing: holder })
      })
    } else {
      this.allMarkers.forEach(marker => {
        holder.forEach(place => {
          if (marker.key === place.venueId) {
            marker.setVisible(true)
          }
        })
      })
      this.setState({ currentlyShowing: holder })
    }
  }

  render() {
    return (
      <div className="App" >
        <header role="banner" className="App-header">
          {/* TODO: Photographer:	Trinity Kubassek
        https://stocksnap.io/photo/54M8Z4V4JG */}
          <h1 tabIndex="0">
            Party On
          </h1>
        </header>
        <a href="#sidebar" className="skip-link">Skip to night club search</a>
        <main>
          <div id="map-container">
            <div
              id="map"
              tabIndex="-1"
              role="application"
              aria-label="location">
              {/* <img src={this.props.copyOfMapAtl} alt="map of Atlanta, GA" /> */}
            </div>
          </div>
          <ErrorHandling>
            <Sidebar
              changeSelection={this.changeSelection}
              individualStateUpdate={this.individualStateUpdate}
              appState={this.state}
              allMarkers={this.allMarkers}
            />
          </ErrorHandling>
        </main>
        <Footer />
      </div>
    )
  }
}

export default App
