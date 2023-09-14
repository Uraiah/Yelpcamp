mapboxgl.accessToken = mapToken;  //'<%-process.env.MAPBOX_TOKEN%>'; //Thursday April 27th, 2023 5:15pm the access token appears when you're logged in and copy the code from the website .-->
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, //Added Monday May 1st, 2023 4:55pm //[-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
});
const nav = new mapboxgl.NavigationControl(); //Added June 8th, 2023 4:56pm 
map.addControl(nav, 'bottom-left'); //it can also be top-left. just place that in with the code
new mapboxgl.Marker()//Monday May 1st, 2023 4:28pm
    .setLngLat(campground.geometry.coordinates,) //Added Monday May 1st, 2023 4:55pm //([-74.5, 40])
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
        .setHTML( //Added Thursday May 4th, 2023 4:52pm
            `<h3>${campground.title}</h3><p>${campground.location}</p>` 
        )
    )
    .addTo(map) //Added Monday May 1st, 2023 4:55pm
