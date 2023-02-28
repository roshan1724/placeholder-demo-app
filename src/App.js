import "./App.scss";
import Header from "./components/Header/Header";

import Login from "./components/User/Login/Login";
import Container from "./components/Container/Container";
import Dashboard from "./components/Dashboard/Dashboard";
import Report from "./components/Report/Report";

import UserState from "./context/user/user-state";
import OptionState from "./context/options/option-state";

import { useState } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router  = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/game',
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

  router.subscribe((state) => {
    console.log('Updated State ...', state);
    setCurrentLocation(state.location.pathname);
  });
  
  const [theme, setTheme] = useState('dark');
  const [currentLocation, setCurrentLocation] = useState('/');

  const updateColorTheme = (themeName) => {
    switch(themeName) {
      case 'light': setTheme('light'); break;
      case 'dark': setTheme('dark'); break;
      default: setTheme('light');
    }
  }

  return (
    <div className={theme === 'dark' ? "App container-fluid theme-dark" : "App container-fluid theme-light"}>
      <UserState>
        <OptionState>
          <Header updateTheme={updateColorTheme} currentLocation={currentLocation}/>
          <RouterProvider router={router} />
          {/* <Container /> */}
        </OptionState>
      </UserState>
    </div>
  );
}

export default App;
