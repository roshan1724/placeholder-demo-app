/**
 * Component Name: Header
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Contains the design layout of the Header across the page
 */

import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import useLocalStorage, { getDefaultStorageValue } from "../../hooks/useLocalStorage";
import "./Header.scss";

function Header({ currentLocation }) {

  const [userData, setUserData] = useState({
    isLoggedIn: false
  });

  const updateUserData = (currentLocation) => {
    if(!["/"].includes(currentLocation)) {
      setUserData({
        isLoggedIn: true
      });
    } else {
      setUserData({
        isLoggedIn: false
      });
    }
  }

  useEffect(() => {
    console.log(currentLocation);
    updateUserData(currentLocation);
  }, [currentLocation]);

  return (
    userData.isLoggedIn &&
    <header className="p-3 mb-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between header-wrapper">
        <a
          href="/"
          className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
        >
          <img
            className="brand-logo"
            src="/images/logo_placeholder.png"
            alt="brand logo"
          />
        </a>

        <div className="page-header-right d-flex align-items-center">
          <span className="notification-wrapper position-relative me-3 no-print">
            <img
              src="/images/notification_bell.png"
              alt="bell-icon"
              className="bell-icon"
            />
            <span className="position-absolute badge rounded-pill bg-danger">
              8
            </span>
          </span>
          <img
            src="/images/people-male.png"
            alt="profile-icon"
            className="rounded-circle profile-image"
            width="32"
            height="32"
          />
          <div className="dropdown text-end">
            <a
              href="/"
              className="flex-center text-decoration-none dropdown-toggle profile-wrapper"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="profile-name">Graham Smith</span>
            </a>
            <ul className="dropdown-menu text-small">
              <li>
                <a className="dropdown-item" href="/">
                  <span className="icon-wrapper me-2">
                    <i className="fa-solid fa-building"></i>
                  </span>
                  Company Details
                </a>
              </li>
              <li>
                <a className="dropdown-item logout" href="/">
                  <span className="icon-wrapper me-2">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </span>
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
