import { ChangeEventHandler } from "react";

interface formProps {
  labelName?: string;
  type: string;
  name?: string;
  placeholder?: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}: formProps) => {
  return (
    <div>
      <div className={"flex items-center gap-2 mb-2"}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-md text-black"
          >
            随机生成
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 dark: dark:bg-slate-800 border dark:text-white border-gray-300 rounded-lg py-2 px-4 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
};

export default FormField;
