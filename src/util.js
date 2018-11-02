import Foursquare from './img/powered-by-foursquare-grey.svg'
export function load_google_maps() {
    return new Promise(function(resolve, reject) {
        // define the global callback that will run when google maps is loaded
        window.resolveGoogleMapsPromise = function() {
            // resolve the google object
            resolve(window.google);
            // delete the global callback to tidy up since it is no longer needed
            delete window.resolveGoogleMapsPromise;
        }
        // Now, Load the Google Maps API
        const script = document.createElement("script");
        const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
    })
}
export function createInitialMap(infoWin) {
    const atl = {
        lat: 33.748995,
        lng: -84.387982
    }
    const styles = [{
        "featureType": "administrative.land_parcel",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#8080c0"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.business",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#8080c0"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#8080c0"
        }]
    }, {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }]
    const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: atl,
        styles: styles
    })
    //closes infowindow when map is clicked and zooms
    window.google.maps.event.addListener(map, 'click', () => {
        infoWin.close()
        map.setZoom(10)
    })
    //closes infowindow if map is clicked and zooms out
    infoWin.addListener('closeclick', () => {
        infoWin.marker = null
        map.setZoom(11)
    })
    return map
}
/**
 * If venues object received from the third-party API
 * does not contain a neighborhood property, assign one to the 
 * object based on it's lat and lng
 */
export function setNeighborhood(neighbrhdboundsArr, nightSpotsArr) {
    // let resultNeighbrhd = ''
    return nightSpotsArr.map(spot => {
        let match = ''
        neighbrhdboundsArr.forEach(Neighbrhd => {
            if (Neighbrhd.contains(new window.google.maps.LatLng(spot.lat, spot.lng))) {
                match = Neighbrhd
            }
        })
        let answer = ''
        switch (match) {
            case
            neighbrhdboundsArr[0]:
                answer = 'Buckhead'
                break
            case
            neighbrhdboundsArr[1]:
                answer = 'Downtown'
                break
            case
            neighbrhdboundsArr[2]:
                answer = 'Little Five Points'
                break
            case
            neighbrhdboundsArr[3]:
                answer = 'Midtown'
                break
            default:
                answer = 'Not found'
        }
        spot.neighborhood = answer
        return spot
    })
}
/**
 * Gets initial data from Foursquare and returns 
 * in an array. File response.json contains a sample
 * request of five venues, used for testing purposes
 */
export function getNightSpots() {
    let fourSqParams = [
        // `ll=33.748995,-84.387982`,
        `near=Atlanta,GA`, `query=club`, `limit=20`,
        // `openNow=1`,
        `radius=25000`, `client_id=3ZV20H0X5WOSYXQQ2FVI0NHCNGPYLTHUZQLRE1EVOTRGHYKP`, `client_secret=3AOFNXLIEMMCFLR3VSXRALYVCWUYFT4SEVXYUTSKKD3WJWXV`, `v=20181003`
    ].join('&')
    let fourSqUrl = `https://api.foursquare.com/v2/venues/explore?${fourSqParams}`
    return new Promise(function(resolve, reject) {
        // fetch('../response.json')
        fetch(fourSqUrl).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            let venueInfo = data.response.groups[0].items.map(dataItem => {
                return {
                    "name": dataItem.venue.name,
                    "venueId": dataItem.venue.id,
                    "lat": dataItem.venue.location.lat,
                    "lng": dataItem.venue.location.lng,
                    "icon": dataItem.venue.categories[0].icon,
                    "neighborhood": dataItem.venue.location.neighborhood,
                    "isVisible": true, //marker visibility
                    "listDetailVisible": false,
                    "rating": dataItem.venue.rating,
                }
            })
            resolve(venueInfo)
        }).catch(error => {
            console.log(`This is the problem: ${error}`)
        })
    })
}
/**
 * Fetches detailed infomation about each venue, pushes that infomation
 * to an array and returns that array. File /details.json contains such 
 * information from one venue, used for testing purposes
 */
export function getSpotDetails(spotsArray) {
    if (!spotsArray) {
        return null
    }
    spotsArray.map(spot => {
        let DetailParams = ['id=' + spot.venueId, `client_id=3ZV20H0X5WOSYXQQ2FVI0NHCNGPYLTHUZQLRE1EVOTRGHYKP`, `client_secret=3AOFNXLIEMMCFLR3VSXRALYVCWUYFT4SEVXYUTSKKD3WJWXV`, `v=20181003`].join('&')
        let detailsUrl = `https://api.foursquare.com/v2/venues/${spot.venueId}?${DetailParams}`
        // console.log(detailsUrl)
        fetch(detailsUrl)
            // fetch('../details.json')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            }).then(data => {
                const match = spotsArray.find(spot => spot.venueId === data.response.venue.id)
                return (Object.assign(match, data.response.venue))
            }).then(addSpot => {
                return (Object.assign(spotsArray, addSpot))
            }).catch(error => {
                console.log(`No spot details because: ${error}`)
            })
        return spot
    })
    return spotsArray
}
export function createMarkerArray(array, map, infoWin) {
    let bounds = new window.google.maps.LatLngBounds()
    return array.map(spot => {
        let marker = new window.google.maps.Marker({
            key: spot.venueId,
            icon: {
                url: "http://maps.google.com/mapfiles/kml/pal2/icon27.png"
            },
            map: map,
            position: {
                lat: spot.lat,
                lng: spot.lng
            },
            title: spot.name,
            animation: window.google.maps.Animation.DROP
        })
        bounds.extend(marker.position)
        //on marker click, zooms in and displays infowindow
        marker.addListener('click', () => {
            map.setZoom(12);
            map.setCenter(marker.getPosition());
            const contentStr = `<div class="venue-name"><strong> ${spot.name}</strong></div>
            ${spot.location && spot.location.formattedAddress && spot.location.formattedAddress[0] ?
                    spot.location.formattedAddress[0] : "Adddress Not Available"}
            ${spot.location && spot.location.formattedAddress && spot.location.formattedAddress[1] ?
                    spot.location.formattedAddress[1] : ""}<div class="attr-container-iw">
                    <object data=${Foursquare} type="image/svg+xml" width:"75" height:"auto" class="fourSqr"/>
                    </div></img></div>`
            infoWin.setContent(contentStr)
            infoWin.open(map, marker)
        })
        map.fitBounds(bounds)
        return marker
    })
}
export function createInfoWindow() {
    let infowindow = new window.google.maps.InfoWindow({
        content: '',
        maxWidth: 300
    })
    infowindow.addListener('closeClick', () => {
        console.log('closed it!')
    })
    return infowindow
}
/**
 * Creaates new bounds for each neighborhood defined.  This is used 
 * to assign neighborhoods to the third-party data and also to pan
 * the map when filtering
 */
export function createNeighborhoodBounds() {
    const buckheadBounds = new window.google.maps.LatLngBounds(new window.google.maps.LatLng(33.792169, -84.45991400000003), new window.google.maps.LatLng(33.887608, -84.33972))
    const downtownBounds = new window.google.maps.LatLngBounds(new window.google.maps.LatLng(33.742658, -84.406596), new window.google.maps.LatLng(33.77138, -84.378626))
    const litte5PtsBounds = new window.google.maps.LatLngBounds(new window.google.maps.LatLng(33.761912, -84.352697), new window.google.maps.LatLng(33.767893, -84.348282))
    const midtownBounds = new window.google.maps.LatLngBounds(new window.google.maps.LatLng(33.771228, -84.394419), new window.google.maps.LatLng(33.802375, -84.364615))
    return [buckheadBounds, downtownBounds, litte5PtsBounds, midtownBounds]
}
/**
 * Uses an array of bounds which contains LatLngBounds to center, zoom, and panTo
 */
export function panToNeighborhoodBounds(selectedValue, boundsarr, map) {
    if (selectedValue === 'Buckhead') {
        const center = map.setCenter(new window.google.maps.LatLng(33.837266, -84.406761))
        map.setZoom(12)
        map.panToBounds(boundsarr[0])
        return [boundsarr[0], center]
    } else if (selectedValue === 'Downtown') {
        map.setZoom(12)
        const center = map.setCenter(new window.google.maps.LatLng(33.755711, -84.388372))
        map.panToBounds(boundsarr[1])
        return [boundsarr[1], center]
    } else if (selectedValue === 'Little Five Points') {
        map.setZoom(12)
        const center = map.setCenter(new window.google.maps.LatLng(33.764387, -84.349604))
        map.panToBounds(boundsarr[2])
        return [boundsarr[2], center]
    } else if (selectedValue === 'Midtown') {
        map.setZoom(12)
        const center = map.setCenter(new window.google.maps.LatLng(33.783315, -84.383117))
        map.panToBounds(boundsarr[3])
        return [boundsarr[3], center]
    } else {
        map.setZoom(10)
        map.setCenter(new window.google.maps.LatLng(33.755711, -84.388372))
    }
}