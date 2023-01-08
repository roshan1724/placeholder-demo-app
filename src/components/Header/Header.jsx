import "./Header.scss";

function Header() {
  return (
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
          <span className="notification-wrapper position-relative me-3">
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
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Sign out
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
