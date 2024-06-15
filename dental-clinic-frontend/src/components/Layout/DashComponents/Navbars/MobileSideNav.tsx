import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Drawer, Sidebar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import Axios from "@/lib/Axios";
import navItems from "../Contants/navItems";
import LogoutModal from "../Modals/LogoutModal";
import SideNavListLayout from "./SideNavListLayout";

type SideNavMobileT = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileSideNav = ({ isOpen, setIsOpen }: SideNavMobileT) => {
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

  return (
    <>
      <Drawer
        open={isOpen}
        className="flex gap-3 640min:hidden flex-col"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <img
            src="/clinic_logo_2.png"
            onClick={() => setIsOpen(false)}
            className="h-[40px] shadow-2xl rounded-[50%]"
            alt=""
          />
          <h1 className="text-[20px] text-slate-800 font-bold">
            Dental Clinic
          </h1>
        </div>
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <Sidebar.Items>
              <Sidebar.ItemGroup className="gap-2 flex flex-col">
                {/* NavList */}
                {navItems
                  .filter((item) => !item.ADMIN || isAdmin)
                  .map((item: any, index: any) => (
                    <Link key={index} to={item.link}>
                      <SideNavListLayout
                        key={index}
                        className={`gap-2 ${
                          location.pathname === item.link
                            ? "text-white bg-green-700/60"
                            : "text-slate-800 hover:text-white hover:animate-pulse hover:bg-green-700/60"
                        } rounded-lg p-2 pl-[9px]`}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-[25px]"
                        />

                        <p className={`text-base ml-${item.marginLeft}`}>
                          {item.text}
                        </p>
                      </SideNavListLayout>
                    </Link>
                  ))}

                {/* Logout */}
                <SideNavListLayout
                  onClick={() => setOpenLogoutModal(true)}
                  className="bottom-0 left-0 text-slate-800 hover:text-white hover:animate-pulse hover:bg-green-700/60 rounded-lg p-2 pl-[9px]"
                >
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className="text-[25px]"
                  />
                  <p className="text-base ml-3">Logout</p>
                </SideNavListLayout>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Drawer.Items>
      </Drawer>

      {/* Modals */}
      <LogoutModal
        openLogoutModal={openLogoutModal}
        setOpenLogoutModal={setOpenLogoutModal}
      />
    </>
  );
};

export default MobileSideNav;
