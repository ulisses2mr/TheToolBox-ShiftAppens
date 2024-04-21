

import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Pinpoint from '../../Assets/pinpoint.svg';

const Mapa = () => {
  const [markers, setMarkers] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBiTzQJC0q3hiuKdEyaZgTWkB02v-sY_PI',
  });

  const handleClick = (event) => {
    setMarkers([...markers, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }]);
  };

  const mapStyle = {
    position: 'fixed',
    top: '15%',
    left: '15%',
    width: '70%',
    height: '70%',
    zIndex: '9999',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const center = {
    lat: 40.7580,
    lng: -73.9857,
  };

  const customMapStyles = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        { color: '#ECEBE4' }, // Change water color to blue
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        { color: 'D9D9D9' }, // Change landscape color to light gray
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        { color: '37323E' }, // Change road color to yellow
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        { color: '#982C1F' }, // Change green areas color to green
      ],
    },
  ];

  return (
    <div style={mapStyle}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '8px' }}
          center={center}
          zoom={13}
          onClick={handleClick}
          options={{ styles: customMapStyles }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              icon={{
                url:{Pinpoint}
            
              }}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Mapa;
