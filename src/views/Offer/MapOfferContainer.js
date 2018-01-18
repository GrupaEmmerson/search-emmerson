import React from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
} from "react-google-maps";
const { compose, withProps} = require("recompose");


export const MapOfferContainer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBA9X1FA_bOugQ9pK8uoO9dK7WXHM_-zE8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }}/>,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }}/>,
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultCenter={ props.markerLocation }
        defaultZoom={12}
        options={
            {
                minZoom: 12,
                maxZoom: 16
            }
        }
    >
        <Marker position={props.markerLocation} icon={'./img/'+props.markerIco}/>
    </GoogleMap>
);

