import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListItem extends Component {
    static propTypes = {
    }

    render() {
        const { spot } = this.props
        return (
            <div className="list-items">
                <div className="venue-photo">Photo goes here</div>
                {`${spot.location ? spot.location.formattedAddress[0] : `Address: Not found address`} 
                ${spot.location ? spot.location.formattedAddress[1] : ``}`}
                <p>Rating: {spot.rating ? spot.rating : `rating : Unpublished rating`}</p>
            </div>
        )
    }
}

export default ListItem
