import React, { useState } from "react";
import "./App.css";
import QueryBuilder, { RuleGroupType } from "react-querybuilder";

const fields = [
  { name: "x", label: "X", isShown: true },
  { name: "y", label: "Y", isShown: true },
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

const App = () => {
  const [updateQuery, setUpdateQuery] = useState<RuleGroupType>({
    id: "root",
    combinator: "and",
    rules: [],
  });
  const [records, setRecords] = useState([]);

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
              records.map((record) => (
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
      </div>
    </>
  );
};

export default App;