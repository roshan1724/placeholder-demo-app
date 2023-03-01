import { createBrowserRouter } from "react-router-dom"

import Login from "./components/User/Login/Login";
import Container from "./components/game/playboard/Container/Container";
import Dashboard from "./components/Dashboard/Dashboard";
import Report from "./components/Report/Report";
import CompanyHome from "./components/company/Home/Home";
import CompanyDetails from "./components/company/Details/Details";
import CompanyEmailSetup from "./components/company/EmailSetup/emailSetup";
import GameHome from "./components/game/Home/Home";

const AppRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      index: true,
      element: <Login />
    },
    {
      path: '/company',
      element: <CompanyHome />
    },
    {
      path: '/company/home',
      element: <CompanyHome />
    },
    {
      path: '/company/details',
      element: <CompanyDetails />
    },
    {
      path: '/company/email-setup',
      element: <CompanyEmailSetup />
    },
    {
      path: '/game',
      element: <GameHome />
    },
    {
      path: '/game/playboard',
      element: <Container />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/report',
      element: <Report />
    }
  ]);

  return routes;
}

export default AppRoutes