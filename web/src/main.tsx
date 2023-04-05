import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter, 
  redirect, 
  RouterProvider
} from "react-router-dom";
import SettingsForm from "./settings/SettingsForm";
import TemplatesIndex from "./templates/TemplatesIndex";
import VariablesIndex from "./variables/VariablesIndex";
import Dashboard from "./dashboard/Dashboard";
import BitmapsIndex from "./bitmaps/BitmapsIndex";

const router = createBrowserRouter([
  {
    path: '/app',
    element: <App />,
    children: [
      { path: "templates/*",  element: <TemplatesIndex /> }, 
      { path: "settings/*",  element: <SettingsForm /> }, 
      { path: "variables/*",  element: <VariablesIndex /> }, 
      { path: "bitmaps/*",  element: <BitmapsIndex /> }, 
      { path: "dashboard",  element: <Dashboard /> },
    ]
  },
  { path: "/",  element: <></>, loader: () => redirect('/app/dashboard') }, 
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);
