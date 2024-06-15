import * as XLSX from "xlsx";
import { format, parseISO } from "date-fns";
import { useNavigate } from "@tanstack/react-router";
import { Button, Dropdown, Table } from "flowbite-react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { AppointmentT } from "@/types/index";
import { isAuthenticated } from "@/lib/useToken";
import { AppointmentTab } from "@/lib/contants";
import { ToastTypes, useToast } from "@/lib/useToast";
import DashLayout from "@/components/Layout/DashLayout";
import { DELETE_APPOINTMENT, GET_APPOINTMENT } from "@/api";
import DeleteModal from "@/components/Layout/DashComponents/Modals/DeleteModal";

const Appointment = () => {
  const navigate = useNavigate();

  const { Toast } = useToast();

  const [filterDate, setFilterDate] = useState("");
  const [filterService, setFilterService] = useState("");
  const [openModalAppointment, setOpenModalAppointment] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(Number);

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const { data }: UseQueryResult<AppointmentT[], Error> = useQuery({
    queryKey: ["appointment"],
    queryFn: async () => {
      return GET_APPOINTMENT();
    },
    refetchInterval: 1000,
  });

  const datas = data?.filter((appointment) => {
    const matchDate = filterDate
      ? format(parseISO(appointment.date), "yyyy-MM-dd") === filterDate
      : true;
    const matchService = filterService
      ? appointment.services.some((service) => service.name === filterService)
      : true;
    return matchDate && matchService;
  });

  const handleDeleteClick = (id: number | SetStateAction<null> | undefined) => {
    setSelectedAppointmentId(id as number);
    setOpenModalAppointment(true);
  };

  const handleDeleteConfirm = async () => {
    await setOpenModalAppointment(false);
    Toast("Appointment has been deleted successfully", ToastTypes.SUCCESS);
    await DELETE_APPOINTMENT(selectedAppointmentId as any);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(event.target.value);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterService(event.target.value);
  };

  const allServices = Array.from(
    new Set(
      data?.flatMap((appointment) =>
        appointment.services.map((service) => service.name)
      ) || []
    )
  );

  const exportToExcel = () => {
    if (!datas) {
      console.error("No data to export");
      return;
    }

    const formattedData = datas.map((appointment) => ({
      id: appointment.id,
      userId: appointment.userId,
      dentistId: appointment.dentistId,
      date: appointment.date,
      status: appointment.status,
      user: appointment.user?.name,
      dentist: appointment.dentist?.name,
      services: appointment.services.map((service) => service.name).join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
    XLSX.writeFile(workbook, "appointments.xlsx");
  };

  return (
    <>
      <DashLayout>
        <div className="flex h-full w-full">
          <div className="z-1 w-full mt-24 px-4 gap-2">
            <h1 className="text-2xl font-bold pb-5">Appointments</h1>
            <div className="flex 992min:items-center gap-2 992max:flex-col pb-5">
              <Button onClick={exportToExcel}>Export to excel</Button>
              <input
                type="date"
                value={filterDate}
                onChange={handleDateChange}
                className="border border-gray-300 p-2 rounded"
              />
              <select
                value={filterService}
                onChange={handleServiceChange}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="">All Services</option>
                {allServices.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto shadow-md">
              <Table hoverable>
                <Table.Head>
                  {AppointmentTab.map(
                    (items: { Tab: string }, index: number) => (
                      <Table.HeadCell
                        key={index}
                        className="font-semibold text-base"
                      >
                        {items.Tab}
                      </Table.HeadCell>
                    )
                  )}
                </Table.Head>
                <Table.Body className="divide-y">
                  {datas?.map((items) => (
                    <Table.Row key={items.id}>
                      <Table.Cell className="text-base whitespace-nowrap font-medium text-slate-900">
                        {items?.user.name}
                      </Table.Cell>
                      <Table.Cell className="text-base">
                        {items?.status}
                      </Table.Cell>
                      <Table.Cell className="text-base">
                        <Dropdown label="Services" inline placement="auto">
                          {items?.services.map((service, index) => (
                            <Dropdown.Item key={index} value={service.name}>
                              {service.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown>
                      </Table.Cell>
                      <Table.Cell className="text-base">
                        {items?.dentist.name}
                      </Table.Cell>
                      <Table.Cell className="text-base">
                        {format(parseISO(items?.date), "MM-dd-yyyy")}
                      </Table.Cell>

                      <Table.Cell className="text-base">
                        {items.time}
                      </Table.Cell>

                      <Table.Cell className="text-base gap-2 ite flex">
                        <FontAwesomeIcon
                          className="text-red-400 text-lg cursor-pointer hover:text-red-900"
                          icon={faTrash}
                          onClick={() => handleDeleteClick(items.id)}
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

      <DeleteModal
        deleted={handleDeleteConfirm}
        show={openModalAppointment}
        onClose={() => setOpenModalAppointment(false)}
      >
        Are you sure do you want to delete the appointment?
      </DeleteModal>
    </>
  );
};

export default Appointment;
