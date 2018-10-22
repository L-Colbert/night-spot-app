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
    // map.setCenter(new google.maps.LatLng(-34, 151));
    // map.setCenter({ lat: -34, lng: 151 });
    // myLatLng = new google.maps.LatLng({ lat: -34, lng: 151 });

    const displayNeighborhood = () => {
      if (selectedValue === 'Buckhead') {
        const buckheadBounds = new this.google.maps.LatLngBounds(
          new this.google.maps.LatLng(-33.792269, -84.460429),
          new this.google.maps.LatLng(33.887703, -84.339777)
        )
        this.map.setCenter(new this.google.maps.LatLng(33.837266, -84.406761))
        this.map.setZoom(12)
        this.map.panToBounds(buckheadBounds)
      } else if (selectedValue === 'Downtown') {
        const downtownBounds = new this.google.maps.LatLngBounds(
          new this.google.maps.LatLng(-33.742658, -84.406596),
          new this.google.maps.LatLng(33.77138, -84.378626)
        )
        this.map.setZoom(12)
        this.map.setCenter(new this.google.maps.LatLng(33.755711, -84.388372))
        this.map.panToBounds(downtownBounds)
      } else if (selectedValue === 'Little Five Points') {
        const litte5PtsBounds = new this.google.maps.LatLngBounds(
          new this.google.maps.LatLng(-33.761912, -84.352697),
          new this.google.maps.LatLng(33.767893, -84.348282)
        )
        this.map.setZoom(12)
        this.map.setCenter(new this.google.maps.LatLng(33.764387, -84.349604))
        this.map.panToBounds(litte5PtsBounds)
      } else if (selectedValue === 'Midtown') {
        const midtownBounds = new this.google.maps.LatLngBounds(
          new this.google.maps.LatLng(-33.771228, -84.394419),
          new this.google.maps.LatLng(33.802375, -84.364615)
        )
        this.map.setZoom(12)
        this.map.setCenter(new this.google.maps.LatLng(33.783315, -84.383117))
        this.map.panToBounds(midtownBounds)
      } else {
        this.map.setZoom(10)
        this.map.setCenter(new this.google.maps.LatLng(33.755711, -84.388372))
      }
    }
    displayNeighborhood()


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

      if (holder.length === 0) {
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
