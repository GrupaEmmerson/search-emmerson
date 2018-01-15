import React from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    InfoWindow,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
const { compose, withProps, lifecycle} = require("recompose");
import { connect } from 'react-redux';
const _ = require("lodash");
import * as actions from '../../actions';
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
    viewport: state.viewport.viewport,
    location: state.location.location,
    offers: state.offers.offers,
    isLoaded: state.isLoaded.isLoaded,
});

export const MapWithASearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBA9X1FA_bOugQ9pK8uoO9dK7WXHM_-zE8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }}/>,
        containerElement: <div style={{ height: `100%`}}/>,
        mapElement: <div style={{ height: `100%` }}/>,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            this.setState({
                bounds: null,
                center: {
                    lat: 52.2209732, lng: 21.0118365
                },
                markers: [],
                markersOffer: [],
                searchTerm: '',
                checkLocation: '',
                isChange: false,
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    refs.map.fitBounds(bounds);
                },
                onSelectMarker: (marker, index, props) => {
                    props.setViewport({index: index, position: marker});
                },
                onCloseOverlay: (props) => {
                    props.setViewport({index: null, position: null});
                },
                onZoomSetBounds: (props) => {
                    this.setState({mapBounds: refs.map.getBounds()});

                    if(props.isLoaded){
                        const minLat = this.state.mapBounds.f.b;
                        const maxLat = this.state.mapBounds.f.f;
                        const minLng = this.state.mapBounds.b.b;
                        const maxLng = this.state.mapBounds.b.f;

                        props.setLocation({arguments:{minLatitude:minLat, maxLatitude: maxLat, minLongitude: minLng, maxLongitude: maxLng}});
                        props.setIsLoaded(false);
                        this.setState({checkLocation: props.location});
                    }
                }
            });
        },
    }),
    withScriptjs,
    withGoogleMap,
    connect(mapStateToProps, actions)
)(props =>
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={12}
            center={props.center}
            onDragEnd={() => setTimeout(() =>
                {
                    props.onZoomSetBounds(props)
                }, 100)
            }
            onZoomChanged={() => setTimeout(() =>
            {
                props.onZoomSetBounds(props)
            }, 100)
            }
            options={
                {
                    minZoom: 12,
                    maxZoom: 16
                }
            }
        >
            <SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_CENTER}
                onPlacesChanged={props.onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Wyszukaj..."
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `360px`,
                        height: `32px`,
                        marginTop: `10px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        color: '#fff'
                    }}
                    className='bg-dark search-box'
                />
            </SearchBox>
            {props.markers.map((marker, index) =>
                <Marker key={index} position={marker.position} />
            )}
                {props.tableData ? props.tableData.map((e) => {
                    return(
                        <Marker
                            key={e.id}
                            position={{ lat: parseFloat(e.latitude), lng: parseFloat(e.longitude) }}
                            onClick={() => props.onSelectMarker({ lat: parseFloat(e.latitude), lng: parseFloat(e.longitude) }, e.id, props)}
                            icon={'./img/'+e.ico}
                            zIndex={parseInt(e.id)}
                        >
                            {props.viewport && props.viewport.index === e.id &&
                                <InfoWindow
                                    position={props.viewport.position}
                                    onCloseClick={() => props.onCloseOverlay(props)}
                                    options={{}}
                                >

                                <Link to={"/offer/"+e.id} target='_blank'>
                                    <div className='googft-info-window row nopadding a-no-decoration' style={{minWidth: 330+'px', width: 100+'%', margin: 0, padding: 0, minHeight: 100 + 'px', color: '#000'}}>
                                            <div style={{float: left}} className='nopadding'>
                                                <img src={ e.photo_url } style={{width: 150+'px', maxHeight: 100+'px'}}/>
                                            </div>
                                            <div style={{float: left, marginLeft: 20+'px'}}>
                                                <b>Miasto</b> {e.city}<br/>
                                                <b>Nr. Oferty:</b> {e.number}<br/>
                                                <b>Rodzaj:</b> {e.item}<br/>
                                                <b>Cena:</b> {e.price}<br/>
                                                <b>Cena za m<sup>2</sup>:</b> {e.price_per_m2}<br/>
                                            </div>
                                        </div>
                                </Link>
                                </InfoWindow>
                            }
                        </Marker>);
                }) : ''}
        </GoogleMap>
);

