import Input from "@/components/Inputs/Input";
import { Button, Label, Modal } from "flowbite-react";

const EditProfileModal = ({
  openModal,
  setOpenModal,
  edit,
  setEdit,
  onClick,
}: any) => {
  return (
    <Modal
      show={openModal}
      size="lg"
      className="fade-in"
      onClose={setOpenModal}
    >
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Body>
        <div className="space-y-3">
          <h1 className="text-xl">Personal Information</h1>
          <form action="">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                placeholder="First Middle Last"
                name="name"
                value={edit.user.name}
                onChange={(e) =>
                  setEdit((prevState: any) => ({
                    ...prevState,
                    user: {
                      ...prevState.user,
                      name: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={edit.email}
                placeholder="example@gmail.com"
                name="email"
                onChange={(e) => setEdit({ ...edit, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                placeholder="+63 0000 000 0000"
                type="text"
                name="contact"
                value={edit.contact}
                onChange={(e) => setEdit({ ...edit, contact: e.target.value })}
              />
            </div>

            <Button className="mt-2" onClick={onClick}>
              Save Changes
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModal;
