import { useEffect } from "react";
import { Table } from "flowbite-react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { UserT } from "@/types";
import { GET_PATIENTS } from "@/api";
import { PatientListTab } from "@/lib/contants";
import { isAuthenticated } from "../../lib/useToken";
import DashLayout from "../../components/Layout/DashLayout";

const Patient = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const { data: datas }: UseQueryResult<UserT[], Error> = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      return GET_PATIENTS();
    },
    refetchInterval: 1000,
  });

  return (
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
                {PatientListTab.map((items: { Tab: string }, index: number) => (
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
                    <Table.Cell className="text-base whitespace-nowrap text-slate-900">
                      {item.user.name}
                    </Table.Cell>
                    <Table.Cell className="text-base">
                      +63 {item.contact || "Not Provided"}
                    </Table.Cell>
                    <Table.Cell className="text-base">{item.email}</Table.Cell>
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

export default Patient;