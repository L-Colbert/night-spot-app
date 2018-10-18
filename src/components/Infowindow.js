import React from 'react'
// import PropTypes from 'propTypes'


//TODO: change to function
function Infowindow(props) {
    const { selectedPlace } = this.props
    return (
        <div>
            <h2>{selectedPlace.name}</h2>
            <div>
                <p>{selectedPlace.address && selectedPlace.address[0] && selectedPlace.address[0].formattedAddress[0] ? selectedPlace.address[0].formattedAddress[0] : ``}</p>
                <p>{selectedPlace.address && selectedPlace.address[0] && selectedPlace.address[0].formattedAddress[0] ? selectedPlace.address[0].formattedAddress[1] : ``}</p>
                <p>Hours: {selectedPlace.hours ? selectedPlace.hours : `Hours unknown`}</p>
                <p>Rating: {selectedPlace.rating ? selectedPlace.rating : `Not rated`}</p>
            </div>
        </div>
    )
}

export default Infowindow