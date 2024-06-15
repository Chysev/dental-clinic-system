import { Dropdown, Table } from "flowbite-react";
import { format, parseISO, isToday } from "date-fns";
import { useNavigate } from "@tanstack/react-router";
import { SetStateAction, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { AppointmentT } from "@/types/index";
import { isAuthenticated } from "@/lib/useToken";
import { AppointmentTab } from "@/lib/contants";
import { ToastTypes, useToast } from "@/lib/useToast";
import DashLayout from "@/components/Layout/DashLayout";
import { DELETE_APPOINTMENT, GET_APPOINTMENT } from "@/api";
import DeleteModal from "@/components/Layout/DashComponents/Modals/DeleteModal";

const TodaysAppt = () => {
  const navigate = useNavigate();

  const { Toast } = useToast();

  const [filterService, setFilterService] = useState("");
  const [openModalAppointment, setOpenModalAppointment] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const { data }: UseQueryResult<AppointmentT[], Error> = useQuery({
    queryKey: ["todays-appointment"],
    queryFn: async () => {
      return GET_APPOINTMENT();
    },
    refetchInterval: 1000,
  });

  const handleDeleteClick = (id: number | SetStateAction<null> | undefined) => {
    setSelectedAppointmentId(id as number);
    setOpenModalAppointment(true);
  };

  const handleDeleteConfirm = async () => {
    setOpenModalAppointment(false);
    Toast("Appointment has been deleted successfully", ToastTypes.SUCCESS);
    await DELETE_APPOINTMENT(selectedAppointmentId as any);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterService(event.target.value);
  };

  const todayAppointments = data?.filter((appointment) => {
    const matchDate = isToday(parseISO(appointment.date));
    const matchService = filterService
      ? appointment.services.some((service) => service.name === filterService)
      : true;
    return matchDate && matchService;
  });

  const allServices = Array.from(
    new Set(
      data?.flatMap((appointment) =>
        appointment.services.map((service) => service.name)
      ) || []
    )
  );

  return (
    <>
      <DashLayout>
        <div className="flex h-full w-full">
          <div className="z-1 w-full mt-24 px-4 gap-2">
            <h1 className="text-2xl font-bold pb-5">Appointments</h1>
            <div className="flex 992min:items-center gap-2 992max:flex-col pb-5">
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
                  {todayAppointments?.map((items) => (
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
                        {format(parseISO(items?.date), "hh:mm a")}
                      </Table.Cell>

                      <Table.Cell className="text-base gap-2 flex">
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
        openModal={openModalAppointment}
        setOpenModal={() => setOpenModalAppointment(false)}
        deleted={handleDeleteConfirm}
      >
        Are you sure you want to delete the appointment?
      </DeleteModal>
    </>
  );
};

export default TodaysAppt;
