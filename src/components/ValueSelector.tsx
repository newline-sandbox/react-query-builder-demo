import { ValueSelectorProps } from "react-querybuilder";

const ValueSelector = ({
  className,
  handleOnChange,
  options,
  value,
  title,
}: ValueSelectorProps) => (
  <div className={`mr-2 inline-block ${className}`} title={title}>
    <select
      className="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={value}
      onChange={(evt) => handleOnChange(evt.target.value)}
    >
      {options.map((option) => {
        const key = option.id ? `key-${option.id}` : `key-${option.name}`;

        return (
          <option key={key} value={option.name}>
            {option.label}
          </option>
        );
      })}
    </select>
  </div>
);

export default ValueSelector;
