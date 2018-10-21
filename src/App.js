import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { load_google_maps, getNightSpots, createInitialMap, createMarkerArray, getSpotDetails, createInfoWindow } from './util'
import './css/App.css'
import MapContainer from './components/MapContainer'
// import Infowindow from "./components/Infowindow";
import Sidebar from './components/Sidebar'

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
    markers: [],
    onlyInfoWin: null,
    showingInfoWindow: false
  }

  // adapted from code graciously provided by Ryan Waite
  // https://raw.githubusercontent.com/ryanwaite28/script-store/master/js/react_resolve_google_maps.js
  componentDidMount() {
    const googleMapsPromise = load_google_maps()
    const APIdata = getNightSpots()

    Promise.all([googleMapsPromise, APIdata])
      .then(values => {
        this.google = values[0]
        this.nightSpots = values[1]
        const spotDetails = getSpotDetails(this.nightSpots)
        this.infowindow = createInfoWindow(this.google)
        this.map = createInitialMap(this.infowindow)
        let markersArray = createMarkerArray(spotDetails, this.map, this.infowindow)

        this.setState({ currentlyShowing: spotDetails, onlyInfoWin: this.infowindow, markers: markersArray })
      }).catch(error => {
        console.log(`Promise all produced error: ${error}`)
      })
  }

  /**
   * Operates on an instance of MyClass and returns something.
   * @param {!MyClass} obj An object that for some reason needs detailed
   *     explanation that spans multiple lines.
   * @param {!OtherClass} obviousOtherClass
   * @return {boolean} Whether something occurred.
   */
  individualStateUpdate = (key, value) => {
    this.setState({ key: value })
  }

  /**
   * Operates on an instance of MyClass and returns something.
   * @param {!MyClass} obj An object that for some reason needs detailed
   *     explanation that spans multiple lines.
   * @param {!OtherClass} obviousOtherClass
   * @return {boolean} Whether something occurred.
   */
  changeSelection = (selectedValue) => {
    
    // if(searchResults.length === 0 ) {
    //     this.infowindow.marker = null
    //     this.infowindow.close()
    // }

    this.infowindow.marker = null
    this.infowindow.close()



    const holder = this.nightSpots.filter(spot => 
      spot.neighborhood === selectedValue)

    if (selectedValue === "Select a") {
      this.setState({ currentlyShowing: this.nightSpots })
      this.state.markers.forEach(marker => {
            marker.setVisible(true)
            this.map.setZoom(10)
            })
    } else {

      if (holder.length === 0 ) {
        this.state.markers.forEach(marker => {
          marker.setVisible(false)
          })      
      }
        this.state.markers.forEach(marker => {
            holder.forEach(place => {
                marker.key === place.venueId ? 
                marker.setVisible(true) : marker.setVisible(false)
                })
        })
      this.setState({ currentlyShowing: holder })
    }
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
          <Sidebar
            changeSelection={this.changeSelection}
            individualStateUpdate={this.individualStateUpdate}
            appState={this.state}
          />
        </nav>
        <MapContainer />
      </div>
    )
  }
}

export default App;
