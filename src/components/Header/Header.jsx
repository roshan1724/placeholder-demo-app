import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../store/auth-slice";
import { UiActions } from "../../store/ui-slice";
import { HEADER_NAV_ICONS, USER_ROLES } from "../../utilities/constants";
import "./Header.scss";
// import { Link } from "react-router-dom";

function Header({ currentLocation }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.userRoles);
  const showGameViewNavIcon = useSelector(
    (state) => state.ui.header.gameView.showGameView
  );
  const isGameViewNavIconActive = useSelector(
    (state) => state.ui.header.gameView.isActive
  );

  const updateNavIconViewStates = useCallback(
    (iconName) => {
      dispatch(
        UiActions.setShowGameView(
          iconName === HEADER_NAV_ICONS.GAME_VIEW &&
            userRole.includes(USER_ROLES.ADMIN)
        )
      );
    },
    [dispatch, userRole]
  );

  const updateNavIconActiveStates = useCallback(
    (currentLocation, iconName) => {
      dispatch(
        UiActions.setGameViewActive(
          iconName === HEADER_NAV_ICONS.GAME_VIEW &&
            currentLocation.includes("/games")
        )
      );
    },
    [dispatch]
  );

  useEffect(() => {
    console.log(currentLocation);
    if (!["/"].includes(currentLocation)) {
      // TODO: Get User state from localstorage
      dispatch(AuthActions.login());
      dispatch(AuthActions.setUserRole([USER_ROLES.ADMIN, USER_ROLES.PLAYER]));
    } else {
      dispatch(AuthActions.logout());
      dispatch(AuthActions.setUserRole(null));
    }
  }, [currentLocation, dispatch]);

  useEffect(() => {
    // Navigation Icons
    for (const icon in HEADER_NAV_ICONS) {
      updateNavIconViewStates(icon);
      updateNavIconActiveStates(currentLocation, icon);
    }
  }, [currentLocation, updateNavIconActiveStates, updateNavIconViewStates]);

  return (
    isLoggedIn && (
      <header className="p-3 mb-3">
        <div className="d-flex flex-wrap align-items-center justify-content-between header-wrapper">
          <a
            href="/games"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <img
              className="brand-logo"
              src="/images/logo_placeholder.png"
              alt="brand logo"
            />
          </a>

          <div className="page-header-right d-flex align-items-center">
            <span
              className={`nav-icon-wrapper game-view-nav-icon ${
                !showGameViewNavIcon ? "d-none" : ""
              } ${isGameViewNavIconActive ? "active" : ""}`}
            >
              {/* <Link to={`/games`}> */}
              <i className="fa-solid fa-chess-rook"></i>
              {/* </Link> */}
            </span>
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
            <div className="dropdown text-end">
              <button
                type="button"
                className="btn dropdown-toggle profile-wrapper c-font-12 ellpsis-overflow"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/images/people-male.png"
                  alt="profile-icon"
                  className="rounded-circle profile-image"
                  width="32"
                  height="32"
                />
                <span className="btn-text">Graham Smith</span>
                <span className="icon-wrapper ms-2">
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </button>
              <ul className="dropdown-menu text-small">
                {}
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
    )
  );
}

export default Header;
