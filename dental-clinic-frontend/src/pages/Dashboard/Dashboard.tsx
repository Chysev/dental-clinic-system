import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Badge, Button, Card, Table } from "flowbite-react";

import { LogEntry } from "@/types";
import DashLayout from "../../components/Layout/DashLayout";
import useToken, { isAuthenticated } from "../../lib/useToken";

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeInOut, setTimeInOut] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [comment, setComment] = useState("");

  const { data: datas } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      return useToken();
    },
    refetchInterval: 1000,
  });

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  const handleTimeInOut = () => {
    const currentTime = new Date().toLocaleString();
    setLog([
      ...log,
      {
        status: timeInOut ? "Time Out" : "Time In",
        time: currentTime,
        comment,
      },
    ]);
    setTimeInOut(!timeInOut);
    setComment("");
  };

  return (
    <DashLayout>
      <div className="flex flex-col h-full w-full px-4 1024min:px-0 1024min:flex-row 1024min:gap-4">
        <div className="w-full mt-28 1024min:px-4">
          <h1 className="text-2xl font-semibold mb-5">Dashboard</h1>
          <div className="flex flex-col 1024min:flex-row w-full gap-4 p-2">
            <div className="space-y-4 w-full 1024min:max-w-[900px]">
              <div className="flex flex-col 1290min:flex-row gap-4">
                <Card className="w-full p-4">
                  <h1 className="text-2xl text-center font-semibold">
                    Hello, {datas?.user.name}!
                  </h1>
                  <img
                    src={`${datas?.user.avatarUrl}`}
                    alt="User Avatar"
                    className="rounded-full w-32 h-32 mx-auto my-4"
                  />
                  <div className="w-full max-w-[200px] mx-auto">
                    <select className="cursor-pointer w-full hover:shadow-lg rounded p-2">
                      <option value="">Available</option>
                      <option value="">On Duty</option>
                      <option value="">Off Duty</option>
                    </select>
                  </div>

                  <div>
                    <p>Name: {datas?.user.name}</p>
                    <p>Email: {datas?.email}</p>
                    <p>Contact: +63 {datas?.contact || "Not Provided"}</p>
                    <p>Position: {datas?.user.role}</p>
                    <p>Account Created: {datas?.createdAt}</p>
                  </div>
                </Card>
                <Card className="w-full flex flex-col items-center justify-center p-4">
                  <h1 className="text-xl mb-4">Time Tracker</h1>
                  <Badge
                    color={timeInOut ? "success" : "failure"}
                    className="mb-4"
                  >
                    {timeInOut ? "Currently In" : "Currently Out"}
                  </Badge>
                  <Button
                    onClick={handleTimeInOut}
                    className={`font-bold rounded mb-2 ${timeInOut ? "" : ""}`}
                  >
                    {timeInOut ? "Time Out" : "Time In"}
                  </Button>

                  <Card className="w-full mt-4">
                    <h1 className="text-xl mb-2">Time Log</h1>
                    <div className="overflow-y-auto max-h-[85px]">
                      <Table hoverable className="w-full">
                        <Table.Head>
                          <Table.HeadCell>Status</Table.HeadCell>
                          <Table.HeadCell>Time</Table.HeadCell>
                          <Table.HeadCell>Comment</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                          {log.map((entry, index) => (
                            <Table.Row key={index}>
                              <Table.Cell>{entry.status}</Table.Cell>
                              <Table.Cell>{entry.time}</Table.Cell>
                              <Table.Cell>{entry.comment}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </Card>
                </Card>
              </div>

              <Card>
                <h1 className="text-xl">Recent Activities</h1>
              </Card>
            </div>
            <div className="w-full">
              <Table hoverable className="w-full shadow-sm rounded-lg">
                <Table.Head>
                  <Table.HeadCell className="text-base">
                    Absences
                  </Table.HeadCell>
                  <Table.HeadCell className="text-base">Date</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Sick</Table.Cell>
                    <Table.Cell>01/01/2023</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
};

export default Dashboard;
