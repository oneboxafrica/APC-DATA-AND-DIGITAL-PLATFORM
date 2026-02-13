
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";


export const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    page: <Dashboard />,
  },
  {
    label: "Not Found",
    to: "*",
    page: <NotFound />,
  },
];
