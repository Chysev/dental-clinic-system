import { useEffect } from "react";
import { Table } from "flowbite-react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { AccountT } from "@/types";
import { GET_STAFFS } from "@/api";
import { Default_Tabs } from "@/lib/contants";
import { isAuthenticated } from "../../lib/useToken";
import DashLayout from "../../components/Layout/DashLayout";

const Staff = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const {
    error,
    isLoading,
    data: datas,
  }: UseQueryResult<AccountT[], Error> = useQuery({
    queryKey: ["dentist"],
    queryFn: async () => {
      return GET_STAFFS();
    },
    refetchInterval: 1000,
  });

  if (isLoading) {
    return (
      <DashLayout>
        <div className="flex h-full w-full">
          <div className="z-1 w-full mt-24 px-4 gap-2">
            <div className="flex 420min:items-center gap-1 420max:flex-col 420max:gap-0">
              <h1 className="text-2xl font-bold 420min:pb-3">Staffs</h1>
              <p className="text-slate-500">
                All registered and verified staffs on the system.
              </p>
            </div>
            <div className="overflow-x-auto shadow-md">
              <Table hoverable className="min-w-full">
                <Table.Head>
                  {Default_Tabs.map((items: { Tab: string }, index: number) => (
                    <Table.HeadCell
                      key={index}
                      className="font-semibold text-base animate-pulse bg-gray-300 h-6 rounded"
                    >
                      {items.Tab}
                    </Table.HeadCell>
                  ))}
                </Table.Head>
                <Table.Body className="divide-y">
                  {Array(5)
                    .fill("")
                    .map((_, index) => (
                      <Table.Row key={index} className="animate-pulse">
                        <Table.Cell className="text-base whitespace-nowrap font-medium text-slate-900 bg-gray-300 h-6 rounded"></Table.Cell>
                        <Table.Cell className="text-base bg-gray-300 h-6 rounded"></Table.Cell>
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
    <DashLayout>
      <div className="flex h-full w-full">
        <div className="z-1 w-full mt-24 px-4 gap-2">
          <div className="flex 420min:items-center gap-1 420max:flex-col 420max:gap-0">
            <h1 className="text-2xl font-bold 420min:pb-3">Staffs</h1>
            <p className="text-slate-500">
              All registered and verified staffs on the system.
            </p>
          </div>
          <div className="overflow-x-auto shadow-md">
            <Table hoverable className="min-w-full">
              <Table.Head>
                {Default_Tabs.map((items: { Tab: string }, index: number) => (
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
                    <Table.Cell className="text-base whitespace-nowrap font-medium text-slate-900">
                      {item.user.name}
                    </Table.Cell>
                    <Table.Cell className="text-base">
                      +63 {item.contact || "Not Provided"}
                    </Table.Cell>
                    <Table.Cell className="text-base">{item.email}</Table.Cell>
                    <Table.Cell className="text-base">{item.status}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </DashLayout>
  );
};

export default Staff;
