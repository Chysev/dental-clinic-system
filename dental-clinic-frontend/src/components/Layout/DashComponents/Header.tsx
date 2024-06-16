import {
  faChevronDown,
  faSliders,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Axios from "@/lib/Axios";
import useToken from "@/lib/useToken";
import DeleteModal from "./Modals/DeleteModal";
import SettingsModal from "./Modals/SettingsModal";
import MobileSideNav from "./Navbars/MobileSideNav";
import { ToastTypes, useToast } from "@/lib/useToast";

const Header = () => {
  const navigate = useNavigate();

  const { Toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openModalSettings, setOpenModalSettings] = useState(false);
  const [openModalCloseAccount, setOpenModalCloseAccount] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { data: datas } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      return useToken();
    },
    refetchInterval: 1000,
  });

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    } else {
      setTimeout(() => setIsDropdownOpen(true), 100);
    }
  };

  const deleteAccount = async () => {
    try {
      await Axios.delete("/api/delete-account").then((res) => {
        if (res) {
          Toast(res.data.message, ToastTypes.SUCCESS);

          setTimeout(() => {
            Toast("Redirecting...", ToastTypes.SUCCESS);
          }, 2000);

          setTimeout(() => {
            Toast("5", ToastTypes.SUCCESS);
          }, 3000);

          setTimeout(() => {
            Toast("4", ToastTypes.SUCCESS);
          }, 4000);

          setTimeout(() => {
            Toast("3", ToastTypes.SUCCESS);
          }, 5000);

          setTimeout(() => {
            Toast("2", ToastTypes.SUCCESS);
          }, 6000);

          setTimeout(() => {
            Toast("1", ToastTypes.SUCCESS);
          }, 7000);

          setTimeout(() => {
            navigate({ to: "/auth/login" });
          }, 8000);
        }
      });
    } catch (error) {
      Toast(
        "Error cannot delete an account please try again later",
        ToastTypes.ERROR
      );
    }
  };

  return (
    <>
      <div className="min-h-[70px] z-[10] bg-white text-slate-800 shadow-slate-700/20 shadow-sm fixed w-full grid items-center">
        <div className="px-2 flex items-center justify-between">
          <div>
            <img
              onClick={() => setIsOpen(true)}
              src="/clinic_logo_2.png"
              className="h-[40px] 640min:hidden shadow-2xl rounded-[50%]"
              alt=""
            />
          </div>
          <div
            className="flex items-center gap-4 hover:bg-slate-200 p-2  rounded-[24px] cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="flex items-center gap-2">
              <img
                src={`${datas?.user.avatarUrl}`}
                className="rounded-[50%] h-[40px]"
                alt=""
              />
              <div>
                <p>{datas?.user.name}</p>
                <p className="text-[10px]">{datas?.user.role}</p>
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} />

            {isDropdownOpen && (
              <div
                className={`absolute right-3 top-[63px] mt-2 w-[200px] bg-white shadow-md  border rounded-lg ${
                  isDropdownOpen ? "fade-in" : "fade-out"
                }`}
              >
                <ul>
                  <li className="flex items-center border pr-2 hover:bg-gray-100 cursor-pointer pl-4 py-2 gap-2">
                    <img
                      src={`${datas?.user.avatarUrl}`}
                      className="rounded-[50%] h-[40px]"
                      alt=""
                    />
                    <div>
                      <p>{datas?.user.name}</p>
                      <p className="text-[10px]">{datas?.user.role}</p>
                    </div>
                  </li>

                  <li
                    onClick={() => setOpenModalSettings(true)}
                    className="flex gap-3 items-center px-4 border-b py-2 hover:bg-gray-100 pl-6 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faSliders} className="text-[28px]" />
                    <p>Settings</p>
                  </li>

                  <li
                    onClick={() => setOpenModalCloseAccount(true)}
                    className="flex gap-3 items-center px-4 border-b py-2 hover:bg-gray-100 pl-6 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-[28px]" />
                    <p>Close Account</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SettingsModal
        openModalSettings={openModalSettings}
        setOpenModalSettings={() => setOpenModalSettings(false)}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
      />

      <DeleteModal
        deleted={deleteAccount}
        show={openModalCloseAccount}
        onClose={() => setOpenModalCloseAccount(false)}
      >
        Are you sure do you want to close your account?
      </DeleteModal>
      <MobileSideNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
