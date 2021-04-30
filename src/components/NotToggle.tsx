import { NotToggleProps } from "react-querybuilder";

const NotToggle = ({
  className,
  handleOnChange,
  title,
  checked,
}: NotToggleProps) => (
  <div className={`mr-2 relative flex items-start ${className}`}>
    <div className="flex items-center h-5">
      <input
        id="notToggle"
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray-300 rounded"
        type="checkbox"
        onChange={(evt) => handleOnChange(evt.target.checked)}
        checked={!!checked}
      />
    </div>
    <div className="ml-2 text-sm">
      <label
        title={title}
        htmlFor="notToggle"
        className="font-medium text-gray-700"
      >
        Not
      </label>
    </div>
  </div>
);

export default NotToggle;
