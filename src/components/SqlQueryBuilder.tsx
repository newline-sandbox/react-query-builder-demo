import React, { useState } from "react";
import QueryBuilder, { RuleGroupType } from "react-querybuilder";
import ActionElement from "./ActionElement";
import NotToggle from "./NotToggle";
import ValueEditor from "./ValueEditor";
import ValueSelector from "./ValueSelector";
import { DISPLAYED_FIELDS } from "../enums";

const controlElements = {
  addGroupAction: ActionElement,
  addRuleAction: ActionElement,
  combinatorSelector: ValueSelector,
  fieldSelector: ValueSelector,
  notToggle: NotToggle,
  operatorSelector: ValueSelector,
  removeGroupAction: ActionElement,
  removeRuleAction: ActionElement,
  valueEditor: ValueEditor,
};

const SqlQueryBuilder = ({ className, onSendQuery }) => {
  const [updateQuery, setUpdateQuery] = useState<RuleGroupType>({
    id: "root",
    combinator: "and",
    rules: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendQuery = async (_evt) => {
    setIsLoading(true);

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

      onSendQuery(data);
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <div className={className}>
      <QueryBuilder
        fields={DISPLAYED_FIELDS}
        onQueryChange={(q) => setUpdateQuery(q)}
        controlElements={controlElements}
      />
      <button
        type="button"
        className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        onClick={sendQuery}
        disabled={isLoading}
      >
        Send Query
      </button>
    </div>
  );
};

export default SqlQueryBuilder;
