import { ButtonProps } from "@/types";

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-[#FFFFF] shadow-lg hover:cursor-pointer hover:opacity-[0.8] w-full outline-none py-2 px-4 rounded-lg text-black`}
    >
      {children}
    </button>
  );
};

export default Button;
