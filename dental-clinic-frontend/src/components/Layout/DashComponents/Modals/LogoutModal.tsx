import { Button, Modal } from "flowbite-react";
import { useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import Axios from "@/lib/Axios";

type LogoutModalT = {
  openLogoutModal: boolean;
  setOpenLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutModal = ({ openLogoutModal, setOpenLogoutModal }: LogoutModalT) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await Axios.get("/auth/logout");
      navigate({ to: "/auth/login" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Modal
      show={openLogoutModal}
      size="sm"
      className="fade-in m-auto"
      onClose={() => setOpenLogoutModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 text-center">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-[38px]" />
          <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Are you sure do you want to log out?
          </p>
          <div className="flex justify-center gap-2">
            <Button onClick={logout}>Yes, I'm sure</Button>
            <Button onClick={() => setOpenLogoutModal(false)}>
              No, Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
