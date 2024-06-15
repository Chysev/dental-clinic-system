import Input from "@/components/Inputs/Input";
import { isAuthenticated } from "@/lib/useToken";
import { useNavigate } from "@tanstack/react-router";
import { FileInput, Label, Modal } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Axios from "@/lib/Axios";
import { UpdateState } from "@/types";
import Button from "../../../Buttons/Button";
import { useEffect, useState } from "react";
import { ToastTypes, useToast } from "@/lib/useToast";

const SettingsModal = ({
  openModalSettings,
  setOpenModalSettings,
  showPassword,
  toggleShowPassword,
}: any) => {
  const navigate = useNavigate();

  const { Toast } = useToast();

  const [Update, setUpdate] = useState<UpdateState>({
    user: {
      name: "",
      // avatarUrl: null,
    },
    email: "",
    contact: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    setUpdate({
      ...Update,
      user: {
        ...Update.user,
        avatarUrl: file,
      },
    });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", Update.user.name);
    formData.append("email", Update.email);
    formData.append("contact", Update.contact);
    formData.append("oldPassword", Update.oldPassword);
    formData.append("newPassword", Update.newPassword);

    if (Update.user.avatarUrl) {
      formData.append("avatarUrl", Update.user.avatarUrl);
    }

    Axios.put("/api/edit-own-account/:id", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        if (res && res.data) {
          Toast(res.data.message, ToastTypes.SUCCESS);
        } else {
          console.error("Invalid response:", res);
          Toast("Invalid response from server", ToastTypes.ERROR);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          console.error("Error:", err);
          Toast(err.response.data, ToastTypes.ERROR);
        } else {
          console.error("Invalid error response:", err);
          Toast("Invalid error response from server", ToastTypes.ERROR);
        }
      });
  };

  return (
    <Modal
      show={openModalSettings}
      size="lg"
      className="fade-in"
      onClose={setOpenModalSettings}
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
                onChange={(e) =>
                  setUpdate((prevState) => ({
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
                placeholder="example@gmail.com"
                name="email"
                onChange={(e) =>
                  setUpdate({ ...Update, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                placeholder="+63 0000 000 0000"
                type="text"
                name="contact"
                onChange={(e) =>
                  setUpdate({ ...Update, contact: e.target.value })
                }
              />
            </div>
            <div>
              <div>
                <Label
                  htmlFor="file-upload-helper-text"
                  value="Upload Profile"
                />
              </div>
              <FileInput
                onChange={handleFileChange}
                id="file-upload-helper-text"
                helperText="SVG, PNG, JPG or GIF (MAX. 800x800px)."
              />
            </div>
            <h1 className="text-xl">Credentials</h1>
            <div>
              <Label htmlFor="OldPassword">Old Password</Label>
              <Input
                type="text"
                name="OldPassword"
                onChange={(e) =>
                  setUpdate({ ...Update, oldPassword: e.target.value })
                }
              />
            </div>

            <div className="w-full grid gap-2">
              <label className="text-black" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  onChange={(e) =>
                    setUpdate({ ...Update, newPassword: e.target.value })
                  }
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            <Button
              className="bg-green-500 text-white mt-5"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
