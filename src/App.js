/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */

import React, { Component } from 'react'
import { load_google_maps, getNightSpots, createInitialMap } from './util'
import { setNeighborhood, createNeighborhoodBounds, panToNeighborhoodBounds, createMarkerArray, getSpotDetails, createInfoWindow } from './util'
import './css/App.css'
import Sidebar from './components/Sidebar'
import ErrorHandling from './components/ErrorHandling'

class App extends Component {
  /**
  * Operates on an instance of MyClass and returns something.
  * @param {!MyClass} obj An object that for some reason needs detailed
  *     explanation that spans multiple lines.
  * @param {!OtherClass} obviousOtherClass
  * @return {boolean} Whether something occurred.
  */

  state = {
    // staticMap: [],
    currentlyShowing: [],
    onlyInfoWin: null,
    showingInfoWindow: false
  }

  // adapted from code graciously provided by Ryan Waite
  // https://raw.githubusercontent.com/ryanwaite28/script-store/master/js/react_resolve_google_maps.js
  /**
 * Demonstrates how top-level functions follow the same rules.  This one
 * makes an array.
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
   * Demonstrates how top-level functions follow the same rules.  This one
   * makes an array.
   * @param {TYPE} arg
   * @return {!Array<TYPE>}
   * @template TYPE
   */
  individualStateUpdate = (key, value) => {
    this.setState({ key: value })
  }

  /**
   * Demonstrates how top-level functions follow the same rules.  This one
   * makes an array.
   * @param {TYPE} arg
   * @return {!Array<TYPE>}
   * @template TYPE
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
          <h1 tabIndex="0">
            Party On!
          </h1>
        </header>
        <a href="#sidebar" className="skip-link">Skip to night club search</a>
        <main>
          <div id="map" tabIndex="-1" role="application" aria-label="location">
            {/* <img src={this.props.copyOfMapAtl} alt="map of Atlanta, GA" /> */}
            {/* <MapContainer /> */}
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
      </div>
    )
  }
}

export default App
