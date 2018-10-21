import React from 'react'
// import PropTypes from 'prop-types'

const ListItem = (props) => {
    // static propTypes = {
    // }

    const { spot } = props
    return (
        <div className="list-items">
        {console.log(spot.canonicalUrl)}
            <div className="venue-photo">Photo goes here</div>
            {`${spot.location ? spot.location.formattedAddress[0] : `Address: Not found address`} 
                ${spot.location ? spot.location.formattedAddress[1] : ``}`}
            <p>Rating: {spot.rating ? spot.rating : `rating : Unpublished rating`}</p>
            {/* <a href="http://foursquare.com/v/4aed3d58f964a5205ecd21e3?ref=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}">More Details</a> */}
            <a href={`${spot.canonicalUrl ? spot.canonicalUrl: ``}`}>More Details</a>
        </div>
    )
}

export default ListItem
