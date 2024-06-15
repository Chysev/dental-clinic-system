import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import Axios from "@/lib/Axios";
import navItems from "../Contants/navItems";
import LogoutModal from "../Modals/LogoutModal";
import SideNavListLayout from "./SideNavListLayout";

type SideNavDeskT = {
  isTextVisible: boolean;
  setIsTextVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeskopSideNav = ({ isTextVisible, setIsTextVisible }: SideNavDeskT) => {
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const useToken = async () => {
    try {
      const response = await Axios.get("/api/session");
      setIsAdmin(response.data.user.role === "ADMIN");
      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  };

  useEffect(() => {
    useToken();
  });

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <>
      <div
        className={`fixed 640max:hidden max z-[11]  h-full text-slate-800 shadow-slate-700/20 shadow-md bg-white side-nav overflow-hidden ${
          isTextVisible ? "expanded" : "collapsed"
        }`}
      >
        <div className="flex shadow-sm h-full flex-col py-3 gap-6 px-3">
          <div className="flex items-center gap-2 pl-1 cursor-pointer">
            <img
              onClick={toggleTextVisibility}
              src="/clinic_logo_2.png"
              className="h-[40px] shadow-2xl rounded-[50%]"
              alt=""
            />
            {isTextVisible && (
              <h1 className="text-[20px] font-bold">Dental Clinic</h1>
            )}
          </div>
          {/* NavList */}
          {navItems
            .filter((item) => !item.ADMIN || isAdmin)
            .map((item, index) => (
              <Link key={index} to={item.link}>
                <SideNavListLayout
                  key={index}
                  className={`gap-2 ${
                    location.pathname === item.link
                      ? "text-white bg-green-700/60"
                      : "text-slate-800 hover:text-white hover:animate-pulse hover:bg-green-700/60"
                  } rounded-lg p-2 pl-[9px]`}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-[25px]" />

                  <p className={`text-base ml-${item.marginLeft}`}>
                    {item.text}
                  </p>
                </SideNavListLayout>
              </Link>
            ))}

          <div className="flex-grow"></div>
          {/* Logout */}
          <SideNavListLayout
            onClick={() => setOpenLogoutModal(true)}
            className="bottom-0 left-0 text-slate-800 hover:text-white hover:animate-pulse hover:bg-green-700/60 rounded-lg p-2 pl-[9px]"
          >
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              className="text-[25px]"
            />
            {isTextVisible && <p className="text-base ml-3">Logout</p>}
          </SideNavListLayout>
        </div>
      </div>

      {/* Modals */}
      <LogoutModal
        openLogoutModal={openLogoutModal}
        setOpenLogoutModal={setOpenLogoutModal}
      />
    </>
  );
};

export default DeskopSideNav;
