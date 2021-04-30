import React from "react";
import { SHOWN_RECORDS_LIMIT, FIELDS } from "../enums";

const Table = ({
  className,
  records,
  onLoadMoreRecords,
  shownRecordsCount,
}) => (
  <div className={className}>
    <div
      className="shadow rounded overflow-x-scroll"
      style={{ maxWidth: "calc(100vw - 2rem)" }}
    >
      <table className="table-auto divide-y divide-gray-200">
        <thead>
          <tr>
            {FIELDS.map((field) => (
              <th
                key={field.name}
                className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <span className="line-clamp-2">{field.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.length > 0 &&
            records.slice(0, shownRecordsCount).map((record) => (
              <tr key={record.id}>
                {FIELDS.map((field) => (
                  <td
                    key={field.name}
                    className="px-4 py-4 whitespace-nowrap text-left text-sm text-gray-900"
                  >
                    {field.name === "lat_lng" ? (
                      <code>{JSON.stringify(record[field.name])}</code>
                    ) : (
                      record[field.name] || "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    {records.length && shownRecordsCount <= records.length ? (
      <button
        type="button"
        className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={(_evt) => {
          onLoadMoreRecords();
        }}
      >
        Load {SHOWN_RECORDS_LIMIT} More Records
      </button>
    ) : null}
  </div>
);

export default Table;
