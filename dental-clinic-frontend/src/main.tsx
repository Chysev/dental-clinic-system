import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";

import routeTree from "./routes/__root";
const rootElement = document.getElementById("root")!;
import { RouterProvider, createRouter } from "@tanstack/react-router";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
