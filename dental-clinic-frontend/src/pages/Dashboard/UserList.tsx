import { Table } from "flowbite-react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, SetStateAction, useEffect, useState } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { AccountT, UserT } from "@/types";
import { UserListTab } from "@/lib/contants";
import { isAuthenticated } from "../../lib/useToken";
import { ToastTypes, useToast } from "@/lib/useToast";
import DashLayout from "../../components/Layout/DashLayout";
import { DELETE_ACCOUNT, GET_ALLUSERS, PUT_ACCOUNT } from "@/api";
import DeleteModal from "@/components/Layout/DashComponents/Modals/DeleteModal";
import EditProfileModal from "@/components/Layout/DashComponents/Modals/EditProfile";

const UserList = () => {
  const navigate = useNavigate();
  const { Toast } = useToast();
  const roleOptions = ["MEMBER", "PATIENT", "STAFF", "DENTIST", "ADMIN"];

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const { data: datas }: UseQueryResult<UserT[], Error> = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return GET_ALLUSERS();
    },
    refetchInterval: 1000,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
  const [selectedEditProfileId, setSelectedEditProfileId] = useState<
    number | null
  >(null);

  const [updateInfo, setUpdateInfo] = useState({
    id: 0,
    user: {
      name: "",
    },
    contact: "",
    email: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditAccount = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    PUT_ACCOUNT(Toast, setOpenModalEditProfile, updateInfo.id, {
      name: updateInfo.user.name,
      email: updateInfo.email,
      contact: updateInfo.contact,
    });
  };

  const handleEdit = (account: AccountT) => {
    setUpdateInfo(account);
    setOpenModalEditProfile(true);
  };

  const handleEditRole = (id: number, newRole: string) => {
    PUT_ACCOUNT(Toast, () => {}, id, { role: newRole });
  };

  const handleDelete = (
    id: number | SetStateAction<number | null> | undefined
  ) => {
    setSelectedEditProfileId(id as number);
    setOpenModalDelete(true);
  };

  const handleDeleteConfirm = () => {
    Toast("Service has been deleted successfully", ToastTypes.SUCCESS);
    setOpenModalDelete(false);
    DELETE_ACCOUNT(selectedEditProfileId as any);
  };

  return (
    <>
      <DashLayout>
        <div className="flex h-full w-full">
          <div className="z-1 w-full mt-24 px-4 gap-2">
            <div className="flex 420min:items-center gap-1 420max:flex-col 420max:gap-0">
              <h1 className="text-2xl font-bold 420min:pb-3">Users</h1>
              <p className="text-slate-500">
                All registered users on the system.
              </p>
            </div>
            <div className="overflow-x-auto shadow-md">
              <Table hoverable className="min-w-full">
                <Table.Head>
                  {UserListTab.map((items: { Tab: string }, index: number) => (
                    <Table.HeadCell
                      key={index}
                      className="font-semibold text-base"
                    >
                      {items.Tab}
                    </Table.HeadCell>
                  ))}
                </Table.Head>
                <Table.Body className="divide-y">
                  {datas?.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell className="text-base whitespace-nowrap text-slate-900">
                        {item.id}
                      </Table.Cell>
                      <Table.Cell
                        className={`text-base whitespace-nowrap text-slate-900 ${item.user.role === "ADMIN" ? "text-red-400 font-bold" : item.user.role === "STAFF" ? "text-blue-400 font-semibold" : item.user.role === "DENTIST" ? "text-green-600 font-semibold" : ""}`}
                      >
                        {item.user.role === "ADMIN"
                          ? `Adm ${item.user.name}`
                          : item.user.role === "STAFF"
                            ? `Staff ${item.user.name}`
                            : item.user.role === "DENTIST"
                              ? `Dr. ${item.user.name}`
                              : item.user.name}
                      </Table.Cell>
                      <Table.Cell className="text-base">
                        +63 {item.contact || "Not Provided"}
                      </Table.Cell>
                      <Table.Cell className="text-base">
                        {item.email}
                      </Table.Cell>
                      <Table.Cell className="text-base">
                        <select
                          value={item.user.role}
                          onChange={(e) =>
                            handleEditRole(item.id, e.target.value)
                          }
                          className="border cursor-pointer border-gray-300 rounded p-1"
                        >
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </Table.Cell>
                      <Table.Cell className="text-base gap-2 flex">
                        <FontAwesomeIcon
                          onClick={() => handleEdit(item)}
                          className="text-green-400 text-lg cursor-pointer hover:text-green-900"
                          icon={faPenToSquare}
                        />
                        <FontAwesomeIcon
                          className="text-red-400 text-lg cursor-pointer hover:text-red-900"
                          icon={faTrash}
                          onClick={() => handleDelete(item.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </DashLayout>
      <EditProfileModal
        openModal={openModalEditProfile}
        setOpenModal={() => setOpenModalEditProfile(false)}
        showPassword={showPassword}
        setEdit={setUpdateInfo}
        edit={updateInfo}
        toggleShowPassword={toggleShowPassword}
        onClick={handleEditAccount}
      />
      <DeleteModal
        deleted={handleDeleteConfirm}
        show={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
      >
        Are you sure you want to delete the account?
      </DeleteModal>
    </>
  );
};

export default UserList;
