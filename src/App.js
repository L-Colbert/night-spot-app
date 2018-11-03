/**
 * @fileoverview Main application file
 * containing the map and sidebar components
 */

import React, { Component } from 'react'
import { load_google_maps, getNightSpots, createInitialMap } from './util'
import { setNeighborhood, createNeighborhoodBounds, panToNeighborhoodBounds, createMarkerArray, getSpotDetails, createInfoWindow } from './util'
import './css/App.css'
import Sidebar from './components/Sidebar'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'

class App extends Component {
  state = {
    // staticMap: [],
    currentlyShowing: [],
    onlyInfoWin: null,
    showingInfoWindow: false,
    newError: false
  }

  // adapted from code graciously provided by Ryan Waite
  // https://raw.githubusercontent.com/ryanwaite28/script-store/master/js/react_resolve_google_maps.js
  /**
 * If commponent is mounted, load google maps and 
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
        this.setState({ currentlyShowing: spotDetails, onlyInfoWin: this.infowindow })
      }).catch(error => {
        this.setState({ newError: true })
        throw new Error(`Promise all produced error: ${error}`)
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
   * and filters the map markers and search results, 
   * then updates array of venues, currentlyShowwing in state
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
          {/* Header background, photographer:	Trinity Kubassek
        https://stocksnap.io/photo/54M8Z4V4JG */}
          <h1 tabIndex="0">
            Party On
          </h1>
        </header>
        <a href="#sidebar" className="skip-link">Skip to night club search</a>
        <ErrorBoundary>
          {this.state.newError ? <h2 className="new-error">Sorry, page unavailable</h2> :
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
              <Sidebar
                changeSelection={this.changeSelection}
                individualStateUpdate={this.individualStateUpdate}
                appState={this.state}
                allMarkers={this.allMarkers}
                map={this.map}
              />
            </main>
          }
          <Footer />
        </ErrorBoundary>
      </div>
    )
  }
}

export default App
