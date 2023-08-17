// Thursday may 11 th, 2023 4:58pm
	mapboxgl.accessToken = mapToken; //'pk.eyJ1IjoiZ3JlZ29yeWExIiwiYSI6ImNsZ3dwa2M4ZjJ6anAzaWx1MXlzbnZybTkifQ.H7-JjL1M3RbPIUQquZYiwQ';
    const map = new mapboxgl.Map({
        container: 'cluster-map', // changed container: 'map', and added cluster to 'container: 'map', Wednesday June 7th, 2023 5:09pm
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/light-v11', //Changed from dark Monday June 19th, 2023 4:37pm
        center: [-103.5917, 40.6699],
        zoom: 3
    });
    const nav = new mapboxgl.NavigationControl(); //Added June 8th, 2023 4:54pm 
map.addControl(nav, 'top-left'); //it can also be bottom left. just place that in with the code

    map.on('load', () => {
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        map.addSource('campgrounds', {//Removed 'earthquakes' Wednesday May 17th, 2023 5:08pm
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: campgrounds, //Added Monday May 15th, 2023 5:12pm 
            //'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'campgrounds',//Removed'earthquakes' Wednesday May 17th, 2023 5:08pm
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#00BCD4', //'#51bbd6', //red 'BA68C8' Changed Wednesday May 24th, 2023 5:45pm
                    10, //100,
                    '#2196F3', //orange '#f1f075' Changed Wednesday May 24th, 2023 5:45pm
                    30, //750,
                    '#3F51B5' //yellow '#f28cb1' Changed Wednesday May 24th, 2023 5:45pm
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    15, //20, Changed Wednesday May 24th, 2023 5:47pm
                    10, //100, Changed Wednesday May 24th, 2023 5:47pm
                    30,
                    30, //750, Changed Wednesday May 24th, 2023 5:47pm
                    25 //40 Changed Wednesday May 24th, 2023 5:47pm
                ]
            }
        });

        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'campgrounds',//'earthquakes' //Removed Wednesday May 17th, 2023 5:08pm
            filter: ['has', 'point_count'],
            layout: {
                'text-field': ['get', 'point_count_abbreviated'],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });

        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'campgrounds',//'earthquakes' //Removed Wednesday May 17th, 2023 5:08pm
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });

        // inspect a cluster on click // This code is responsible for clicking on a cluster. 
        map.on('click', 'clusters', (e) => { 
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            const clusterId = features[0].properties.cluster_id;
            map.getSource('campgrounds').getClusterExpansionZoom(//Removed 'earthquakes' Wednesday May 17th, 2023 5:08pm
                clusterId,
                (err, zoom) => {
                    if (err) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on('click', 'unclustered-point', (e) => {
            //console.log("UNCLUSTERES POINT CLICKED!!!");// this is to tell if what's running what //Friday May 12th, 2023 4:35pm
            const { popupMarkup } = e.features[0].properties.popupMarkup();    //text Thursday May  25th, 2023 5:21 pm
            const coordinates = e.features[0].geometry.coordinates.slice(); //    Thursday May  25th, 2023 5:21 pm
           /**  const coordinates = e.features[0].geometry.coordinates.slice();
            const mag = e.features[0].properties.mag;
            const tsunami =
                e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
*/
            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(popupMarkup) //Friday May 25th, 2023 5:34pm
                '<h3>Campground</h3>' // text  //`magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`, '<h3>Campground </h3>'
                .addTo(map);
        });

        map.on('mouseenter', 'clusters', () => {
            //console.log("MOUSING OVER A CLUSTER!!"); //Friday May 12th, 2023 4:36pm
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', () => {
            map.getCanvas().style.cursor = '';
        });
    });
    /*{ //What was the point of this part of the code? Wednesday May 17th, 2023 4:24-4:40pm
       type	"Feature",
	"properties": {"id": "ak16994521", "mag": 2.3, "time":1507425650893, "felt": null, "tsunami": 0},
    "geometry": {"type": "Point" "coordinates": [-151.5129, 63.1016, 0.0 ]}//{""}{""}
	
    }*/
