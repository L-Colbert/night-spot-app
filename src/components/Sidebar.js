import React, { Component } from 'react';
import '../css/App.css'
import ListItem from './ListItem'
import PropTypes from 'prop-types'
import DropDown from './DropDown'

class Sidebar extends Component {
    // static propTypes = {
    //     searchResults: PropTypes.array
    // }

    state = {
        detailsOpen: {},
    }

    moveInfoWindow = (spot) => {
        let props = {
            name: spot.name,
            // address: spot.location.address,
            rating: spot.rating,
            // google: { maps: { … } }
            // hours: undefined
            map: this.props.map,
            // mapCenter: { lat: 33.748995, lng: -84.387982 }
            position: { lat: spot.lat, lng: spot.lng }
        }
        this.props.updateState(props, { lat: spot.lat, lng: spot.lng })
    }

    // https://eddyerburgh.me/toggle-visibility-with-react
    toggleDiv(spot) {
        console.log(this.state.markers)
        const searchResults = this.props.state.currentlyShowing
        const currentlyOpen = this.state.detailsOpen

        searchResults.forEach(result => {
            if (result.listDetailVisible) {
                result.listDetailVisible = !result.listDetailVisible
            }
            if (spot.venueId === result.venueId) {
                result.listDetailVisible = !result.listDetailVisible
                currentlyOpen.listDetailVisible = false
                this.setState({ detailsOpen: spot })
            }
        })
        this.props.individualStateUpdate('currentlyShowing', searchResults)
        //google.maps.event.trigger(markers[x], 'click')

    }

    render() {
        return (
            <div className="sidebar">
                <DropDown
                    changeSelection={this.props.changeSelection} />
                <h2>Search Results</h2>
                <ul>
                    {this.props.state.currentlyShowing.map(spot => (
                        <div key={spot.venueId} className="list-items">
                            <a href="#/" onClick={(e) => this.toggleDiv(spot, e)}>
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
        )
    }
}

export default Sidebar