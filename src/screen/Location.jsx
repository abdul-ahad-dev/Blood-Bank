import Navbar from "../components/NavBar";
import React from "react";
import GoogleMapReact from 'google-map-react';


export default function Location() {

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 20
    };

    return (
        <div className="w-screen h-screen bg-slate-500">
            <Navbar />


            <div className="h-[80vh] w-11/12 mx-auto">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </div>
    )
}