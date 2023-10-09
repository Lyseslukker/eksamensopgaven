import React from 'react'
import "./Praktisk.css"
import Map, {NavigationControl, Marker, GeolocateControl} from 'react-map-gl';
import mapboxgl from "mapbox-gl";


export default function Praktisk() {

    return (
        <div className='praktisk'>
            <h1>Praktisk</h1>

            <div className="praktisk__festival">
                <img src="/mediesuset-map.jpg" alt="Kort over festivalen" />
                <div className="festival__info">
                    <h2>Oversigt over festivalen</h2>
                </div>
            </div>

            <h3>Find os her!</h3>
            <Map
                mapLib={import("mapbox-gl")}
                mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                initialViewState={{
                    latitude: 55.621960226991376,
                    longitude: 12.07886774880964,
                    zoom: 15
                }}
                style={{width: "100vw", height: "40vw", margin: "5vw 0"}}
            >
                <NavigationControl />
                <Marker latitude={55.621960226991376} longitude={12.07886774880964} color='green' />
                <GeolocateControl trackUserLocation={true} positionOptions={{enableHighAccuracy: true}} showAccuracyCircle={true} auto />
            </Map>
        </div>
    )
}
