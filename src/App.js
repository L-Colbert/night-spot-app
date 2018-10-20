import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { load_google_maps, getNightSpots, createInitialMap, createMarkerArray, getSpotDetails } from './util'
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
    nightSpots: [],
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
        //creates infowindow
        let infowindow = new this.google.maps.InfoWindow({
          content: '',
          maxWidth: 300
        })
        //stores data in state
        this.setState({ nightSpots, currentlyShowing: nightSpots, onlyOneInfoWindow: infowindow }, () => {
          this.map = createInitialMap()
        })
        //closes infowindow when map is clicked
        this.google.maps.event.addListener(this.map, 'click', () => {
          infowindow.close()
        })
        //crates array of markers
        let markersArray = createMarkerArray(spotDetails, this.map, infowindow)
        console.log(markersArray)
        // this.setState({ markers: markersArray, showingInfoWindow: isInfoWindowOpen }, () => {
        this.setState({ markers: markersArray }, () => {
          console.log(this.state.markers)
        })
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
    if (selectedValue === "Select a") {
      this.setState({ currentlyShowing: this.state.nightSpots })
    } else {
      const holder = this.state.nightSpots.filter(spot => spot.neighborhood === selectedValue)
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
            currentlyShowing={this.state.currentlyShowing}
            changeSelection={this.changeSelection}
            individualStateUpdate={this.individualStateUpdate}
            state={this.state}
            updateState={this.updateState}
          />
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
