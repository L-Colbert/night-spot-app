/**
 * Creates a sidebar that contains a 
 * dropdown menu used to filter
 * results via a dropdown menu
 */

import React, { Component } from 'react';
import '../css/App.css'
import ListItem from './ListItem'
import DropDown from './DropDown'
import foursquare from '../img/small-pink-foursquare-grey.png'
import PropTypes from 'prop-types'

class Sidebar extends Component {
    static propTypes = {
        appState: PropTypes.object.isRequired,
        allMarkers: PropTypes.array,
        individualStateUpdate: PropTypes.func.isRequired,
        changeSelection: PropTypes.func.isRequired
    }

    state = {
        currentlyOpen: {}
    }




    //inspiration from from Eddy Burgh
    //https://eddyerburgh.me/toggle-visibility-with-react
    toggleDiv(spot) {
        if (spot) {
            try {
            const { appState } = this.props
            const searchResults = appState.currentlyShowing
            const openInfoWindow = (spot) => {
                const match = this.props.allMarkers.find(marker => marker.key === spot.venueId)
                match.setAnimation(window.google.maps.Animation.BOUNCE)
                setTimeout(() => {
                    match.setAnimation(window.google.maps.Animation.null)
                }, 1000)
                window.google.maps.event.trigger(match, 'click')
            }

            appState.onlyInfoWin.close()

            searchResults.forEach(result => {
                //close the info window, and return
                if (result.listDetailVisible) {
                    result.listDetailVisible = !result.listDetailVisible
                    return
                }
                //show clicked list item's details
                if (spot.venueId === result.venueId) {
                    result.listDetailVisible = !result.listDetailVisible
                    appState.onlyInfoWin.close()
                    openInfoWindow(spot)
                }
                this.props.individualStateUpdate('currentlyShowing', searchResults)
            })
            }
            catch (error) {
                throw new Error('List is currently unavailable')
            }
        }
    }

    render() {
        const { appState } = this.props
        return (
            <section>
                <div role="search" id="sidebar">
                    <DropDown changeSelection={this.props.changeSelection} />
                    <div className="results-container">
                        <hr></hr>
                        <div className="attr-container">
                            <img className="attr" src={foursquare} alt="attribution four square" ></img>
                        </div>
                        <div className="list-items-container">
                            <ul>
                                {appState.currentlyShowing.map(spot => (
                                    <li key={spot.venueId} className="list-items">
                                        <a href="#/" onClick={() => this.toggleDiv(spot)}>
                                            {spot.name ? spot.name : `Name unknown`}
                                        </a>
                                        {
                                            spot.listDetailVisible && <ListItem
                                                spot={spot} />
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div >
            </section>
        )
    }
}

export default Sidebar