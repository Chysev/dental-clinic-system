import { ReactNode, useState } from "react";

import Header from "./DashComponents/Header";
import SideNavigation from "./DashComponents/Navbars/DesktopSideNav";

const DashLayout = ({ children }: { children: ReactNode }) => {
  const [isTextVisible, setIsTextVisible] = useState(true);

  return (
    <>
      <Header />
      <div className="flex h-screen">
        <SideNavigation
          isTextVisible={isTextVisible}
          setIsTextVisible={setIsTextVisible}
        />
        <div
          className={`flex  ${
            isTextVisible
              ? "640min:ml-[230px] 640min:w-[calc(100%-230px)]"
              : "640min:ml-[70px] 640min:w-[calc(100%-70px)]"
          } w-full`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default DashLayout;
