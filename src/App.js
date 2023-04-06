import "./App.scss";
import Header from "./components/Header/Header";

import AppRoutes from "./App.routes";

import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Loader from "./components/common/Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "./store/ui-slice";

function App() {
  const router = AppRoutes();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UiActions.populateTimeZones());
  }, [dispatch]);

  router.subscribe((state) => {
    console.log("Updated State ...", state);
    setCurrentLocation(state.location.pathname);
  });

  const [theme, setTheme] = useState("dark");
  const [currentLocation, setCurrentLocation] = useState(
    window.location.pathname
  );

  const updateColorTheme = (themeName) => {
    switch (themeName) {
      case "light":
        setTheme("light");
        break;
      case "dark":
        setTheme("dark");
        break;
      default:
        setTheme("light");
    }
  };

  const loading = useSelector((state) => state.ui.showLoader);
  return (
    <div
      className={`App container-fluid ${
        theme === "dark" ? "theme-dark" : "theme-light"
      } ${loading ? "page-loading" : ""}`}
    >
      <Loader />
      <Header
        updateTheme={updateColorTheme}
        currentLocation={currentLocation}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
