import { ReactNode } from "react";

const SideNavListLayout = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} flex items-center cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default SideNavListLayout;
