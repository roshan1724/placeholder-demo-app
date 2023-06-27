import { createBrowserRouter } from "react-router-dom";

import Login from "./components/User/Login/Login";
import Playboard from "./components/game/playboard/playboard";
import Dashboard from "./components/Dashboard/Dashboard";
import Report from "./components/Report/Report";
import CompanyHome from "./components/company/Home/Home";
// import CompanyDetails from "./components/company/Details/Details";
import CompanyEmailSetup from "./components/company/EmailSetup/emailSetup";
import GameHome from "./components/game/Home/Home";
import AddNewGame from "./components/game/newGame/newGame";
import PrintPDF from "./components/common/Print-PDF/print-pdf";
import AdminHome from "./components/User/Admin/admin";
import AdminGameList from "./components/User/Admin/Game/game-list";
import AdminConfigGame from "./components/User/Admin/Game/game-config";
import { ROUTE_PATHS } from "./utilities/constants";
import DynamicForm from "./components/common/Dynamic-Form/dynamic-form";
import CompanyDetailForm from "./components/company/Details/new-company-form";

const AppRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: ROUTE_PATHS.ROOT,
      index: true,
      element: <Login />,
    },
    {
      path: ROUTE_PATHS.LOGIN,
      element: <Login />,
    },
    {
      path: ROUTE_PATHS.ADMIN,
      element: <AdminHome />,
    },
    {
      path: ROUTE_PATHS.ADMIN_GAME,
      element: <AdminGameList />,
    },
    {
      path: ROUTE_PATHS.ADMIN_CONFIG_GAME_NAME,
      element: <AdminConfigGame />,
    },
    {
      path: ROUTE_PATHS.COMPANY_ROOT,
      element: <CompanyHome />,
    },
    {
      path: ROUTE_PATHS.COMPANY_HOME,
      element: <CompanyHome />,
    },
    {
      path: ROUTE_PATHS.COMPANY_DETAILS,
      element: <CompanyDetailForm />,
    },
    {
      path: ROUTE_PATHS.COMPANY_EMAIL_SETUP,
      element: <CompanyEmailSetup />,
    },
    {
      path: ROUTE_PATHS.GAME_ROOT,
      element: <GameHome />,
    },
    {
      path: ROUTE_PATHS.GAME_ADD_NEW,
      element: <AddNewGame />,
    },
    {
      path: ROUTE_PATHS.GAME_PLAYBOARD,
      element: <Playboard />,
    },
    {
      path: ROUTE_PATHS.DASHBOARD,
      element: <Dashboard />,
    },
    {
      path: ROUTE_PATHS.REPORT,
      element: <Report />,
    },
    {
      path: ROUTE_PATHS.PRINT_PAGE,
      element: <PrintPDF />,
    },
    {
      path: "/dynamic-form",
      element: <DynamicForm />,
    },
  ]);

  return routes;
};

export default AppRoutes;
