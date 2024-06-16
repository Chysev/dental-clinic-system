import { MouseEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Label, Modal, Table } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import Axios from "@/lib/Axios";
import { ServicesT } from "@/types";
import Input from "@/components/Inputs/Input";
import { isAuthenticated } from "../../lib/useToken";
import { DELETE_SERVICE, GET_SERVICES } from "@/api";
import { ToastTypes, useToast } from "@/lib/useToast";
import DashLayout from "@/components/Layout/DashLayout";
import DeleteModal from "@/components/Layout/DashComponents/Modals/DeleteModal";

const Services = () => {
  const navigate = useNavigate();
  const { Toast } = useToast();

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEditService, setOpenModalEditService] = useState(false);
  const [selectedServicesId, setSelectedServicesId] = useState<number | null>(
    null
  );

  const [service, setService] = useState<ServicesT>({
    id: 0,
    name: "",
    price: 0,
  });

  const {
    error,
    isLoading,
    data: datas,
  }: UseQueryResult<ServicesT[], Error> = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return GET_SERVICES();
    },
    refetchInterval: 1000,
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isEdit) {
      Axios.put(`/api/edit-service/${service.id}`, {
        name: service.name,
        price: service.price,
      }).then((res) => {
        if (res) {
          setOpenModalEditService(false);
          Toast("Service updated successfully", ToastTypes.SUCCESS);
        }
      });
    } else {
      Axios.post("/api/service/create", {
        name: service.name,
        price: service.price,
      }).then((res) => {
        if (res) {
          setOpenModalEditService(false);
          Toast(res.data.message, ToastTypes.SUCCESS);
        }
      });
    }
  };

  const handleEditClick = (service: ServicesT) => {
    setService(service);
    setIsEdit(true);
    setOpenModalEditService(true);
  };

  const handleDeleteClick = (id: number | SetStateAction<null> | undefined) => {
    setSelectedServicesId(id as number);
    setOpenModalDelete(true);
  };

  const handleDeleteConfirm = async () => {
    setOpenModalDelete(false);
    Toast("Service has been deleted successfully", ToastTypes.SUCCESS);
    await DELETE_SERVICE(selectedServicesId as any);
  };

  if (isLoading) {
    return (
      <DashLayout>
        <div className="flex h-full w-full">
          <div className="z-1 w-full mt-24 px-4 gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-2xl font-bold pb-3">Services</h1>
              <p className="text-slate-500">All verified services</p>
            </div>

            <div className="border border-gray-300 p-2 rounded animate-pulse h-10 mb-5 w-32"></div>

            <div className="overflow-x-auto shadow-md">
              <Table hoverable className="min-w-full">
                <Table.Head>
                  <Table.HeadCell className="font-semibold text-base animate-pulse bg-gray-300 h-6 rounded">
                    Services
                  </Table.HeadCell>
                  <Table.HeadCell className="font-semibold text-base animate-pulse bg-gray-300 h-6 rounded">
                    Price
                  </Table.HeadCell>
                  <Table.HeadCell className="font-semibold text-base animate-pulse bg-gray-300 h-6 rounded">
                    Actions
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {Array(5)
                    .fill("")
                    .map((_, index) => (
                      <Table.Row key={index} className="animate-pulse">
                        <Table.Cell className="text-base whitespace-nowrap font-medium text-slate-900 bg-gray-300 h-6 rounded"></Table.Cell>
                        <Table.Cell className="text-base bg-gray-300 h-6 rounded"></Table.Cell>
                        <Table.Cell className="text-base bg-gray-300 h-6 rounded"></Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </DashLayout>
    );
  }

  if (error) {
    return (
      <DashLayout>
        <div className="flex h-full w-full">
          <div className="z-1 w-full mt-24 px-4 gap-2">
            <p className="text-red-500">
              Error loading data, please contact your developer.
            </p>
          </div>
        </div>
      </DashLayout>
    );
  }

  return (
    <>
      <DashLayout>
        <div className="flex h-full w-full">
          <div className="z-1 w-full mt-24 px-4 gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-2xl font-bold pb-3">Services</h1>
              <p className="text-slate-500">All verified services</p>
            </div>
            <Button
              className="mb-5"
              onClick={() => {
                setService({ id: 0, name: "", price: 0 });
                setIsEdit(false);
                setOpenModalEditService(true);
              }}
            >
              Create
            </Button>
            <div className="overflow-x-auto shadow-md">
              <Table hoverable className="min-w-full">
                <Table.Head>
                  <Table.HeadCell className="font-semibold text-base">
                    Services
                  </Table.HeadCell>
                  <Table.HeadCell className="font-semibold text-base">
                    Price
                  </Table.HeadCell>
                  <Table.HeadCell className="font-semibold text-base">
                    Actions
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {datas?.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell className="text-base whitespace-nowrap font-medium text-slate-900">
                        {item.name}
                      </Table.Cell>
                      <Table.Cell className="text-base">
                        ${item.price}
                      </Table.Cell>
                      <Table.Cell className="text-base gap-2 flex">
                        <FontAwesomeIcon
                          className="text-green-400 text-lg cursor-pointer hover:text-green-900"
                          icon={faPenToSquare}
                          onClick={() => handleEditClick(item)}
                        />
                        <FontAwesomeIcon
                          className="text-red-400 text-lg cursor-pointer hover:text-red-900"
                          icon={faTrash}
                          onClick={() => handleDeleteClick(item.id)}
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

      {/* Modals */}
      <Modal
        show={openModalEditService}
        size="md"
        className="fade-in"
        onClose={() => setOpenModalEditService(false)}
      >
        <Modal.Header>
          {isEdit ? "Edit service" : "Add new service"}
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-3">
            <div>
              <Label htmlFor="name">Service</Label>
              <Input
                type="text"
                name="name"
                value={service.name}
                onChange={(e) =>
                  setService({ ...service, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                type="text"
                name="price"
                value={service.price}
                onChange={(e) =>
                  setService({ ...service, price: Number(e.target.value) })
                }
              />
            </div>
            <Button onClick={handleSubmit}>
              {isEdit ? "Update" : "Create"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <DeleteModal
        deleted={handleDeleteConfirm}
        show={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
      >
        Are you sure you want to delete the service?
      </DeleteModal>
    </>
  );
};

export default Services;
