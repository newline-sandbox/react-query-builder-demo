import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";

export const CENTER = {
  LAT_LNG: [40.7812, -73.9665],
  LABEL: "Central Park",
};

export const LIBRARIES: Libraries = ["visualization"];

export const SHOWN_RECORDS_LIMIT = 5;

export const FIELDS = [
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
]

export const DISPLAYED_FIELDS = FIELDS.filter(({ isShown }) => isShown);
