import React, { Component } from 'react';
import '../css/App.css'
import ListItem from './ListItem'
import PropTypes from 'prop-types'
import DropDown from './DropDown'
import foursquare from '../img/small-pink-foursquare-grey.png'

class Sidebar extends Component {
    /**
 * Operates on an instance of MyClass and returns something.
 * @param {!MyClass} obj An object that for some reason needs detailed
 *     explanation that spans multiple lines.
 * @param {!OtherClass} obviousOtherClass
 * @return {boolean} Whether something occurred.
 */

    // static propTypes = {
    //     searchResults: PropTypes.array
    // }

    state = {
        detailsOpen: {}
    }

    //inspiration from from Eddy Burgh
    //https://eddyerburgh.me/toggle-visibility-with-react
    toggleDiv(spot) {
        const { appState } = this.props
        const searchResults = appState.currentlyShowing
        const currentlyOpen = this.state.detailsOpen
        const openInfoWindow = (spot) => {
            const match = appState.markers.find(marker => marker.key === spot.venueId)
            match.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(() => {
                match.setAnimation(window.google.maps.Animation.null)
            }, 1000)
            window.google.maps.event.trigger(match, 'click')
        }

        searchResults.forEach(result => {
            //if list details are visible, close it,
            //close the info window, and return
            if (result.listDetailVisible) {
                result.listDetailVisible = !result.listDetailVisible
                appState.onlyInfoWin.close()
                return
            }
            //show clicked list item's details
            if (spot.venueId === result.venueId) {
                result.listDetailVisible = !result.listDetailVisible
                currentlyOpen.listDetailVisible = false
                this.setState({ detailsOpen: spot })
                openInfoWindow(spot)
            }
        })

        this.props.individualStateUpdate('currentlyShowing', searchResults)
    }

    render() {
        const { appState } = this.props

        return (
            <section>
                <div role="search" id="sidebar">
                    <DropDown changeSelection={this.props.changeSelection} />
                    <img src={foursquare} alt="attribution four square" ></img>
                    <ul>
                        {appState.currentlyShowing.map(spot => (
                            <div key={spot.venueId} className="list-items">
                                <a href="#/" onClick={() => this.toggleDiv(spot)}>
                                    {spot.name ? spot.name : `Name unknown`}
                                </a>
                                {
                                    spot.listDetailVisible && <ListItem
                                        spot={spot} />
                                }
                            </div>
                        ))}
                    </ul>
                </div >
            </section>
        )
    }
}

export default Sidebar