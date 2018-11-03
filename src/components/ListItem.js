/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */

import React from 'react'
import '../css/App.css'


const ListItem = (props) => {
    /**
     * Retnders the unordered list of venues
     * and venue info including address and hours open
     */
    const { spot } = props

    const imgTag = () => {
        if (spot.bestPhoto && spot.bestPhoto.prefix) {
            const height = `original`
            const imgSrc = `${spot.bestPhoto.prefix}${height}${spot.bestPhoto.suffix}`
            return <img className="venue-photo" src={imgSrc} alt={spot.name}></img>
        }
    }

    return (
        <div>
            <div className="venue-photo">
                {imgTag()}
            </div>
            <div className="address">
                {`${spot.location ? spot.location.formattedAddress[0] : `Address: Not found address`}
                ${spot.location ? spot.location.formattedAddress[1] : ``}`}
            </div>
            <table>
                <tbody className="hours">
                    {(spot.popular && spot.popular.timeframes) ?
                        spot.popular.timeframes.map(day => (
                            <tr key={day.days} className="hours-list">
                                <td><strong>{day.days}</strong></td><td>{day.open[0].renderedTime}</td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </table>
            <p className="rating">Rating: <span><strong>{spot.rating ? spot.rating : `Unpublished rating`}</strong></span></p>
            <a className="more-details" rel="noopener noreferrer" href={`${spot.canonicalUrl ? spot.canonicalUrl : ``}`} target="_blank">More Details</a>
        </div>
    )
}

export default ListItem
