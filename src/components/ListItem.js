import React from 'react'
// import PropTypes from 'prop-types'

const ListItem = (props) => {
    // static propTypes = {
    // }

    const { spot } = props
    
    const imgTag = () => { 
        if (spot.bestPhoto && spot.bestPhoto.prefix) {
            const height = `height100`
            const imgSrc =`${spot.bestPhoto.prefix}${height}${spot.bestPhoto.suffix}`
            return <img src={imgSrc} alt={spot.name}></img>}
        }

    return (
        <div className="list-items">
            <div className="venue-photo">
                {/* <img src={imgSrc(spot)} alt={spot.name}></img> */}
                {imgTag()}
            </div>
            <div>
                {`${spot.location ? spot.location.formattedAddress[0] : `Address: Not found address`}
                ${spot.location ? spot.location.formattedAddress[1] : ``}`}
                <p>Rating: {spot.rating ? spot.rating : `rating : Unpublished rating`}</p>
            </div>
            <a rel="noopener noreferrer" href={`${spot.canonicalUrl ? spot.canonicalUrl : ``}`} target="_blank">More Details</a>
        </div>
    )
}

export default ListItem
