import "./App.scss";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";

import { useState } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import UserState from "./context/user/user-state";
import OptionState from "./context/options/option-state";
import Dashboard from "./components/Dashboard/Dashboard";
import Report from "./components/Report/Report";

function App() {
  const router  = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/report',
      element: <Report />
    },
    {
      path: '/game',
      element: <Container />
    }
  ]);
  
  const [theme, setTheme] = useState('dark');

  const updateColorTheme = (themeName) => {
    switch(themeName) {
      case 'light': setTheme('light'); break;
      case 'dark': setTheme('dark'); break;
      default: setTheme('light');
    }
  }

  return (
    <div className={theme === 'dark' ? "App container-fluid theme-dark" : "App container-fluid"}>
      <UserState>
        <OptionState>
          <Header updateTheme={updateColorTheme}/>
          <RouterProvider router={router} />
          {/* <Container /> */}
        </OptionState>
      </UserState>
    </div>
  );
}

export default App;
