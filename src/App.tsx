import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  HeatmapLayer,
  useJsApiLoader
} from "@react-google-maps/api";
import "./App.css";
import QueryBuilder, { RuleGroupType } from "react-querybuilder";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const CENTER = {
  LAT_LNG: [40.7812, -73.9665],
  LABEL: "Central Park",
};

const fields = [
  { name: "x", label: "Longitude", isShown: true },
  { name: "y", label: "Latitude", isShown: true },
  { name: "id", label: "ID" },
  { name: "hectare", label: "Hectare", isShown: true },
  { name: "shift", label: "Shift", isShown: true },
  { name: "obs_date", label: "Date", isShown: true },
  { name: "hectare_num", label: "Hectare Number" },
  { name: "age", label: "Age", isShown: true },
  { name: "primary_fur_color", label: "Primary Fur Color", isShown: true },
  { name: "highlight_fur_color", label: "Highlight Fur Color" },
  {
    name: "primary_highlight_fur_color",
    label: "Primary and Highlight Fur Color",
  },
  { name: "color_notes", label: "Color Notes" },
  { name: "obs_location", label: "Location", isShown: true },
  {
    name: "above_grnd_sighter_measurement",
    label: "Above Ground Sighter Measurement",
  },
  { name: "specific_location", label: "Specific Location" },
  { name: "running", label: "Running" },
  { name: "chasing", label: "Chasing" },
  { name: "climbing", label: "Climbing" },
  { name: "eating", label: "Eating" },
  { name: "foraging", label: "Foraging" },
  { name: "other_activities", label: "Other Activities" },
  { name: "kuks", label: "Kuks" },
  { name: "quaas", label: "Quas" },
  { name: "moans", label: "Moans" },
  { name: "tail_flags", label: "Tail Flags" },
  { name: "tail_twitches", label: "Tail Twitches" },
  { name: "approaches", label: "Approaches" },
  { name: "indifferent", label: "Indifferent" },
  { name: "runs_from", label: "Runs From" },
  { name: "other_interactions", label: "Other Interactions" },
  { name: "lat_lng", label: "Lat/Lng" },
];

const displayedFields = fields.filter(({ isShown }) => isShown);

const SHOWN_RECORDS_LIMIT = 5;

const LIBRARIES: Libraries = ["visualization"];

interface Record {
  id: string;
  lat_lng: {
    x: number;
    y: number;
  };
  primary_fur_color: string;
}

function App() {
  const [updateQuery, setUpdateQuery] = useState<RuleGroupType>({
    id: "root",
    combinator: "and",
    rules: [],
  });
  const [records, setRecords] = useState<Record[]>([]);

  const [_map, setMap] = useState(null);
  const [
    openedInfoWindowMarkerId,
    setOpenedInfoWindowMarkerId,
  ] = useState<string>(null);

  const [shownRecordsCount, setShownRecordsCount] = useState<number>(
    SHOWN_RECORDS_LIMIT
  );

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

  const sendQuery = async function (_evt) {
    try {
      const { data } = await (
        await window.fetch("http://localhost:8080/api/records", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: updateQuery }),
        })
      ).json();

      setShownRecordsCount(SHOWN_RECORDS_LIMIT);
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <QueryBuilder
        fields={displayedFields}
        onQueryChange={(q) => setUpdateQuery(q)}
      />
      <button type="button" onClick={sendQuery}>
        Send Query
      </button>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field.name}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length > 0 &&
              records.slice(0, shownRecordsCount).map((record: Record) => (
                <tr key={record.id}>
                  {fields.map((field) => (
                    <td key={field.name}>
                      {field.name === "lat_lng"
                        ? JSON.stringify(record[field.name])
                        : record[field.name] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {records.length && shownRecordsCount <= records.length ? (
          <button
            type="button"
            onClick={(_evt) =>
              setShownRecordsCount((current) => current + SHOWN_RECORDS_LIMIT)
            }
          >
            Load {SHOWN_RECORDS_LIMIT} More Records
          </button>
        ) : null}
      </div>
      {isLoaded ? (
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
                (record: Record) =>
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
      ) : null}
    </>
  );
}

export default App;