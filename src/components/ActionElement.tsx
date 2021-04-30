import { ActionProps } from "react-querybuilder";

const ActionElement = ({
  className,
  handleOnClick,
  label,
  title,
}: ActionProps) => (
  <button
    type="button"
    className={`mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
    title={title}
    onClick={(evt) => handleOnClick(evt)}
  >
    {label}
  </button>
);

export default ActionElement;
