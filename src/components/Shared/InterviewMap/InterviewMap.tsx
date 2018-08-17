import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '../../../config';

const GoogleMapsWrapper = withScriptjs(withGoogleMap((props: any) => {
    const {onMapMounted, ...otherProps} = props;
    return (
        <GoogleMap
            {...otherProps}
            ref={c => {
                return onMapMounted && onMapMounted(c);
            }}
        >
            {props.children}
        </GoogleMap>
    );
}));

const InterviewMap = (props: any) => (
    <GoogleMapsWrapper
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&` +
        `v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{height: 200, width: 350}}/>}
        containerElement={<div style={{height: 200, width: 350}}/>}
        mapElement={<div style={{height: 200, width: 350}}/>}
        defaultZoom={16}
        defaultCenter={{lat: Number(props.lat), lng: Number(props.lng)}}
        options={{
            scrollwheel: false
        }}
    >
        {<Marker position={{lat: Number(props.lat), lng: Number(props.lng)}}/>}
    </GoogleMapsWrapper>
);

export default InterviewMap;
