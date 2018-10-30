/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */

import React from 'react'
import '../css/App.css'


const ListItem = (props) => {
    /**
     * Operates on an instance of MyClass and returns something.
     * @param {!MyClass} obj An object that for some reason needs detailed
     *     explanation that spans multiple lines.
     * @param {!OtherClass} obviousOtherClass
     * @return {boolean} Whether something occurred.
     */
    const { spot } = props

    const imgTag = () => {
        if (spot.bestPhoto && spot.bestPhoto.prefix) {
            const height = `height100`
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
            <ul className="hours">
                {(spot.popular && spot.popular.timeframes) ?
                spot.popular.timeframes.map(day => (
                    <li key={day.days} className="hours-list">
                        {day.days} : {day.open[0].renderedTime}
                    </li>
                ))
                : ``}
            </ul>
            <p className="rating">Rating: <span><strong>{spot.rating ? spot.rating : `Unpublished rating`}</strong></span></p>
            <a className="more-details" rel="noopener noreferrer" href={`${spot.canonicalUrl ? spot.canonicalUrl : ``}`} target="_blank">More Details</a>
        </div>
    )
}

export default ListItem
