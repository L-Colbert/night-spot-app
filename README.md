# Party On

## Table of Context

1. Application Overview
2. Included Technologies
3. Getting Started

## Application Overview

This application will allow users to find a premium (determined by the Foursquare API) night-time party location in the Atlanta metro area.  Users can filter the party locations by neighborhoods using the drop-down menu.  Currently only four metro neighborhoods are available. By default, all night spots are displayed in the results and as markers on the Google map. If a list item in the results is clicked, additional information is displayed along with the corresponding marker on the map. Information displayed in the list results and/or the marker, includes the venue's photo, address, hours of operation, and it's rating. This application uses the Google Map API and Foursquare APIs.

Get the Project

### Included technologies

* [Javascript ES6](http://www.ecma-international.org/ecma-262/6.0/)
* [React 5.6.0](https://reactjs.org/)

### Dependencies and other requirements

* react 16.5.2
* react-dom 16.5.2
* react-router-dom 4.3.1
* react-scripts 2.0.5

## Getting started

1. Open your preferred browser

2. In a terminal window, type ```npm start``` to start the development server.

3. A window with location (localhost:3000) will open in your browser.

4. To create a production bundle, use `npm run build` or `yarn build`.

5. If you want your app to work offline and load faster, you can change ```unregister()``` to ```register()``` in index.js, to register the Service Worker. Note this comes with some pitfalls. Learn more about [service workers](http://bit.ly/CRA-PWA)

### HOW TO use

In the drop-down menu, select the neighborhood that interests you. Select a location, either my selecting it's locaton name or a marker on the map.  The location name is also a link to the Foursquare venue page. If the Foursquare request quota has been exceeded, uncomment line 146 and comment line 147 to use a sample json file

```146 fetch('../response.json').then(response => {```

```147 //fetch(fourSqUrl).then(response => {```

and uncomment line 184 and comment line 183 to use a sample details json file

```183 //fetch(detailsUrl)```

```184 fetch('../details.json')```


### Contributors

[Libby Colbert](https://github.com/L-Colbert)

[Ryan Waite](https://github.com/ryanwaite28/script-store/tree/master/js)

[Google Maps](https://cloud.google.com/maps-platform/)

[Foursquare](https://developer.foursquare.com/)

[Header background](https://stocksnap.io/photo/54M8Z4V4JG), photo by Trinity Kubassek

[Markers](https://sites.google.com/site/gmapsdevelopment/)
