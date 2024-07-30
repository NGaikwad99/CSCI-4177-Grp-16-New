import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 44.651070, 
  lng: -63.582687
};

function LocalResources() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const loadPlaces = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
          location: center,
          radius: '5000',
          keyword: 'mental health clinic'
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setMarkers(results.map(place => ({
              position: place.geometry.location,
              name: place.name,
              address: place.vicinity
            })));
          } else {
            console.error('Places request failed due to:', status);
          }
        });
      } else {
        console.error('Google Maps API not loaded properly.');
      }
    };

    if (window.google && window.google.maps && window.google.maps.places) {
      loadPlaces();
    } else {
      const checkGoogleMapsAPI = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkGoogleMapsAPI);
          loadPlaces();
        }
      }, 1000);
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDCwpVs2NUwsdFDoYlM0WEhDr83tV0-0iU"
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h4>{selectedMarker.name}</h4>
              <p>{selectedMarker.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default LocalResources;
// https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#2
//https://www.google.com/search?sca_esv=29490823a8d86213&sca_upv=1&rlz=1C1YTUH_enIN931IN931&sxsrf=ADLYWIJn5noePXMuKBaVvN5Tjzpv3xZBOA:1721938632783&q=google+map+api+in+react&tbm=vid&source=lnms&fbs=AEQNm0DVrIRjdA3gRKfJJ-deMT8ZtYOjoIt1NWOMRkEKym4u5PkAZgxJOmIgPx6WieMhF6q1Hq7W6nME2Vp0eHuijF3ZElaTgD0zbj1gkQrti2r6HpgEQJ__FI2P2zVbzOTQnx-xQGuWfPA7_LjHL8X54xCjPigLtLX638JLYGhCvRlpvvGBo-fNpc7q_rU8dgffCadMYeMgxPqmupqDpgcFpVxKo2EBMA&sa=X&ved=2ahUKEwiyo6CkgcOHAxUVrYkEHad4Da8Q0pQJegQIExAB&biw=1422&bih=612&dpr=1.35#fpstate=ive&vld=cid:bc4a45d9,vid:PfZ4oLftItk,st:0