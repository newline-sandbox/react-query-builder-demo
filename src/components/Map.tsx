import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  HeatmapLayer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CENTER, LIBRARIES } from "../enums";

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const Map = ({ className, records }) => {
  const [_map, setMap] = useState(null);

  const [
    openedInfoWindowMarkerId,
    setOpenedInfoWindowMarkerId,
  ] = useState<string>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = (_map) => {
    setMap(null);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className={className}>
      <div className="shadow rounded overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "600px" }}
          center={{ lng: CENTER.LAT_LNG[1], lat: CENTER.LAT_LNG[0] }}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {records.length > 0 ? (
            <HeatmapLayer
              data={records.map(
                (record) =>
                  new window.google.maps.LatLng(
                    record.lat_lng.y,
                    record.lat_lng.x
                  )
              )}
            ></HeatmapLayer>
          ) : (
            <Marker
              position={{ lng: CENTER.LAT_LNG[1], lat: CENTER.LAT_LNG[0] }}
              title={CENTER.LABEL}
              onClick={(_evt) => setOpenedInfoWindowMarkerId("default")}
            >
              {openedInfoWindowMarkerId === "default" && (
                <InfoWindow
                  onCloseClick={() => setOpenedInfoWindowMarkerId(null)}
                >
                  <p>{CENTER.LABEL}</p>
                </InfoWindow>
              )}
            </Marker>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
