import { ValueEditorProps } from "react-querybuilder";

const ValueEditor = ({
  operator,
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  values,
}: ValueEditorProps) => {
  if (operator === "null" || operator === "notNull") {
    return null;
  }

  switch (type) {
    case "select":
      return (
        <div className={className}>
          <select
            className="mr-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
            title={title}
            onChange={(evt) => handleOnChange(evt.target.value)}
            value={value}
          >
            {values!.map((v) => (
              <option key={v.name} value={v.name}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "checkbox":
      return (
        <input
          type="checkbox"
          className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray-300 rounded"
          title={title}
          onChange={(evt) => handleOnChange(evt.target.checked)}
          checked={!!value}
        />
      );

    case "radio":
      return (
        <span title={title}>
          {values!.map((v) => (
            <div key={v.name} className="mr-2 flex items-center">
              <input
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray-300"
                type="radio"
                id={v.name}
                value={v.name}
                checked={value === v.name}
                onChange={(evt) => handleOnChange(evt.target.value)}
              />
              <label
                className="ml-2 block text-sm font-medium text-gray-700"
                htmlFor={v.name}
              >
                {v.label}
              </label>
            </div>
          ))}
        </span>
      );

    default:
      return (
        <input
          type={inputType || "text"}
          value={value}
          title={title}
          className={`mr-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border border-gray-300 rounded-md ${className}`}
          onChange={(evt) => handleOnChange(evt.target.value)}
        />
      );
  }
};

export default ValueEditor;
