import { FC } from "react";
import { InputProps } from "../../types";

const Input: FC<InputProps> = ({
  onChange,
  type,
  name,
  value,
  placeholder,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      required={required}
      className="w-full bg-[whitesmoke] py-[6px] rounded-lg px-4 outline-[whitesmoke] focus:outline-[whitesmoke] hover:outline-[whitesmoke] text-black"
      onChange={onChange}
    />
  );
};

export default Input;
