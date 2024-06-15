import { useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";

import { isAuthenticated } from "../../lib/useToken";
import DashLayout from "../../components/Layout/DashLayout";

const Invoices = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated(navigate);
  }, []);

  return (
    <DashLayout>
      <div className="m-auto">Invoices</div>
    </DashLayout>
  );
};

export default Invoices;
