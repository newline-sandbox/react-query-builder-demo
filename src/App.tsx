import React, { useState } from "react";
import "./App.css";
import { SHOWN_RECORDS_LIMIT } from "./enums";
import { Record } from "./types";
import Map from "./components/Map";
import SqlQueryBuilder from "./components/SqlQueryBuilder";
import Table from "./components/Table";

const App = () => {
  const [records, setRecords] = useState<Record[]>([]);

  const [shownRecordsCount, setShownRecordsCount] = useState<number>(
    SHOWN_RECORDS_LIMIT
  );

  const onSendQuery = (data) => {
    setShownRecordsCount(SHOWN_RECORDS_LIMIT);
    setRecords(data);
  };

  const onLoadMoreRecords = () => {
    setShownRecordsCount((current) => current + SHOWN_RECORDS_LIMIT);
  };

  return (
    <>
      <SqlQueryBuilder className="p-4" onSendQuery={onSendQuery} />
      <Table
        className="p-4"
        records={records}
        shownRecordsCount={shownRecordsCount}
        onLoadMoreRecords={onLoadMoreRecords}
      />
      <Map className="p-4" records={records} />
    </>
  );
};

export default App;
