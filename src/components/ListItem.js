import React from 'react'
// import PropTypes from 'prop-types'

const ListItem = (props) => {
    // static propTypes = {
    // }

    const { spot } = props
    return (
        <div className="list-items">
            <div className="venue-photo">Photo goes here</div>
            <div>
                {`${spot.location ? spot.location.formattedAddress[0] : `Address: Not found address`}
                ${spot.location ? spot.location.formattedAddress[1] : ``}`}
                <p>Rating: {spot.rating ? spot.rating : `rating : Unpublished rating`}</p>
            </div>
            <a href={`${spot.canonicalUrl ? spot.canonicalUrl : ``}`}>More Details</a>
        </div>
    )
}

export default ListItem
