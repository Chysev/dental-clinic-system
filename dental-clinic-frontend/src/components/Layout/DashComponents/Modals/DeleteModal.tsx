import { Button, Modal } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const DeleteModal = ({ show, deleted, onClose, children }: any) => {
  return (
    <Modal show={show} size="sm" className="fade-in" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 text-center">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-[38px]" />
          <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
            {children}
          </p>
          <div className="flex justify-center gap-2">
            <Button onClick={deleted}>Yes, I'm sure</Button>
            <Button onClick={onClose}>No, Cancel</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
