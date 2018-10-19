export function load_google_maps() {
    return new Promise(function (resolve, reject) {
        // define the global callback that will run when google maps is loaded
        window.resolveGoogleMapsPromise = function () {
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
    });
}

export function createInitialMap(google) {
    const atl = { lat: 33.748995, lng: -84.387982 }
    return new window.google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: atl
    })
}

export function getNightSpots() {

    // let fourSqParams = [
    //   // `ll=33.748995,-84.387982`,
    //   `near=Atlanta,GA`,
    //   `query=club`,
    //   `limit=3`,
    //   // `openNow=1`,
    //   `radius=25000`,
    //   `client_id=3ZV20H0X5WOSYXQQ2FVI0NHCNGPYLTHUZQLRE1EVOTRGHYKP`,
    //   `client_secret=3AOFNXLIEMMCFLR3VSXRALYVCWUYFT4SEVXYUTSKKD3WJWXV`,
    //   `v=20181003`
    // ].join('&')

    // let fourSqUrl = `https://api.foursquare.com/v2/venues/explore?${fourSqParams}`
    return new Promise(function (resolve, reject) {
        fetch('../venues.json')
            .then(response => {
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
                        //icon is an object w/ keys: prefix, suffix
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

export function getSpotDetails(spotsArray) {
    if (!spotsArray) {
        return null
    }
    spotsArray.map(spot => {
        let DetailParams = [
            // 'id=' + spot.venueId,
            `client_id=3ZV20H0X5WOSYXQQ2FVI0NHCNGPYLTHUZQLRE1EVOTRGHYKP`,
            `client_secret=3AOFNXLIEMMCFLR3VSXRALYVCWUYFT4SEVXYUTSKKD3WJWXV`,
            `v=20181003`
        ].join('&')

        // let detailsUrl = `https://api.foursquare.com/v2/venues/${spot.venueId}?${DetailParams}`

        // fetch(detailsUrl)
        fetch('../details.json')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            }).then(data => {
                const match = spotsArray.find(spot => spot.venueId === data.response.venue.id)
                return (Object.assign(match, data.response.venue))
            })
            .then(addSpot => {
                return (Object.assign(spotsArray, addSpot))
            }).catch(error => {
                console.log(`No spot details because: ${error}`)
            })
    })
    return spotsArray
}

export function createMarkerArray(array, map, infoWin) {
    return array.map(spot => {
        let marker = new window.google.maps.Marker({
            key: spot.venueId,
            map: map,
            position: { lat: spot.lat, lng: spot.lng },
            title: spot.name,
        })
        marker.addListener('click', () => {
            const imgTag = spot.bestPhoto && spot.bestPhoto.prefix ?
                `<img src="${spot.bestPhoto.prefix}height300${spot.bestPhoto.suffix}" alt="${spot.name}">` : ``
            const contentStr = `<div><strong> ${spot.name}</strong></div>
            <div>${imgTag}
            <p> ${spot.location && spot.location.formattedAddress && spot.location.formattedAddress[0] ? spot.location.formattedAddress[0] : ""}
            ${spot.address && spot.address[0] && spot.address[0].formattedAddress[0] ? spot.address[0].formattedAddress[1] : ""}
            Hours: ${spot.hours ? spot.hours : "Hours unknown"}
            Rating: ${spot.rating ? spot.rating : "Rating Unknown"}</p></div>`
            // To change the maximum width when changing content,
            // call close, setOptions, and then open.
            infoWin.setContent(contentStr)
            infoWin.open(map, marker)
        })
        return marker
    })
}