import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Store from "../store/Store";

const SidebarAdmin: React.FC = () => {
  const { token, username, logout } = Store();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const path = window.location.pathname;

  if (token === null) {
    navigate("/admin");
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div
        className={`d-flex flex-column bg-white border-end ${
          isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
        style={{
          width: isCollapsed ? "80px" : "250px",
          height: "100%",
          transition: "width 0.3s ease",
          minHeight: "100vh",
        }}
      >
        <div className="navbar navbar-light bg-white border-bottom px-3 py-2 flex-shrink-0">
          <div className="navbar-brand fw-bold text-dark mb-0">
            {!isCollapsed && (
              <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
                <img
                  src="/src/images/cat_logo.png"
                  alt="logo"
                  className="img-fluid"
                  onClick={toggleSidebar}
                />
              </div>
            )}

            {isCollapsed && (
              <i
                className="align-items-center p-2 rounded"
                onClick={toggleSidebar}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </i>
            )}
          </div>
        </div>

        <nav className="flex-grow-1 px-2 py-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a
                href="/dashboard"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded ${
                  path === "/dashboard" ? "bg-primary text-white" : "text-dark"
                }
                `}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z"
                  />
                  <path
                    fill="currentColor"
                    d="m490.91 244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="flex-grow-1 px-3">Dashboard</span>
                )}
              </a>
            </li>

            <li className="nav-item mb-2">
              <a
                href="/calendar"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded ${
                  path === "/calendar" ? "bg-primary text-white" : "text-dark"
                }
                `}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 10v2H7v-2zm4 0v2h-2v-2zm4 0v2h-2v-2zm2-7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V1h2v2h8V1h2v2zm0 16V8H5v11zM9 14v2H7v-2zm4 0v2h-2v-2zm4 0v2h-2v-2z"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="flex-grow-1 px-3">Calendar</span>
                )}
              </a>
            </li>

            <li className="nav-item m-2">
              {!isCollapsed ? (
                <h5 className="flex-grow-1 px-3 fw-bold">Auth</h5>
              ) : (
                <hr />
              )}
            </li>

            <li className="nav-item mb-2">
              <a
                href="/userAdmin"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded 
                  ${
                    path === "/userAdmin" || path === "/registerAdmin"
                      ? "bg-primary text-white"
                      : "text-dark"
                  }
                  `}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm0 4a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m5.13 12A9.7 9.7 0 0 1 12 20.92A9.7 9.7 0 0 1 6.87 17c-.34-.5-.63-1-.87-1.53c0-1.65 2.71-3 6-3s6 1.32 6 3c-.24.53-.53 1.03-.87 1.53"
                  />
                </svg>

                {!isCollapsed && (
                  <span className="flex-grow-1 px-3">Admin</span>
                )}
              </a>
            </li>

            <li className="nav-item mb-2">
              <a
                href="/users"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded 
                  ${path === "/users" ? "bg-primary text-white" : "text-dark"}
                  `}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="flex-grow-1 px-3">Users</span>
                )}
              </a>
            </li>

            <li className="nav-item m-2">
              {!isCollapsed ? (
                <h5 className="flex-grow-1 px-3 fw-bold">Management</h5>
              ) : (
                <hr />
              )}
            </li>

            <li className="nav-item mb-2">
              <a
                href="/cats"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded 
                  ${
                    path === "/cats" || path === "/addcats"
                      ? "bg-primary text-white"
                      : "text-dark"
                  }
                  `}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 8l-1.33.09C9.81 7.07 7.4 4.5 5 4.5c0 0-1.97 2.96-.04 6.91c-.55.83-.89 1.26-.96 2.25l-1.93.29l.21.98l1.76-.26l.14.71l-1.57.94l.47.89l1.45-.89C5.68 18.76 8.59 20 12 20s6.32-1.24 7.47-3.68l1.45.89l.47-.89l-1.57-.94l.14-.71l1.76.26l.21-.98l-1.93-.29c-.07-.99-.41-1.42-.96-2.25C20.97 7.46 19 4.5 19 4.5c-2.4 0-4.81 2.57-5.67 3.59zm-3 3a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m6 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-4 3h2l-.7 1.39c.2.64.76 1.11 1.45 1.11a1.5 1.5 0 0 0 1.5-1.5h.5a2 2 0 0 1-2 2c-.75 0-1.4-.41-1.75-1c-.35.59-1 1-1.75 1a2 2 0 0 1-2-2h.5a1.5 1.5 0 0 0 1.5 1.5c.69 0 1.25-.47 1.45-1.11z"
                  />
                </svg>
                {!isCollapsed && <span className="flex-grow-1 px-3">Cats</span>}
              </a>
            </li>

            <li className="nav-item mb-2">
              <a
                href="/breeds"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded 
                  ${
                    path === "/breeds" || path === "/addbreeds"
                      ? "bg-primary text-white"
                      : "text-dark"
                  }
                  `}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M8.35 3c1.18-.17 2.43 1.12 2.79 2.9c.36 1.77-.29 3.35-1.47 3.53c-1.17.18-2.43-1.11-2.8-2.89c-.37-1.77.3-3.35 1.48-3.54m7.15 0c1.19.19 1.85 1.77 1.5 3.54c-.38 1.78-1.63 3.07-2.81 2.89c-1.19-.18-1.84-1.76-1.47-3.53c.36-1.78 1.61-3.07 2.78-2.9M3 7.6c1.14-.49 2.69.4 3.5 1.95c.76 1.58.5 3.24-.63 3.73s-2.67-.39-3.46-1.96S1.9 8.08 3 7.6m18 0c1.1.48 1.38 2.15.59 3.72s-2.33 2.45-3.46 1.96s-1.39-2.15-.63-3.73C18.31 8 19.86 7.11 21 7.6m-1.67 10.78c.04.94-.68 1.98-1.54 2.37c-1.79.82-3.91-.88-5.9-.88s-4.13 1.77-5.89.88c-1-.49-1.69-1.79-1.56-2.87c.18-1.49 1.97-2.29 3.03-3.38c1.41-1.41 2.41-4.06 4.42-4.06c2 0 3.06 2.61 4.41 4.06c1.11 1.22 2.96 2.25 3.03 3.88"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="flex-grow-1 px-3">Breeds</span>
                )}
              </a>
            </li>

            <li className="nav-item mb-2">
              <a
                href="/orders"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded 
                  ${path === "/orders" ? "bg-primary text-white" : "text-dark"}
                  `}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414S7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586S19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414S16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586M9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
                    clip-rule="evenodd"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="flex-grow-1 px-3">Orders</span>
                )}
              </a>
            </li>

            <li className="nav-item mb-2">
              <a
                href="/carts"
                className={`nav-link d-flex align-items-center py-2 px-3 rounded 
                  ${path === "/carts" ? "bg-primary text-white" : "text-dark"}
                  `}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"
                  />
                </svg>
                {!isCollapsed && <span className="flex-grow-1 px-3">Cart</span>}
              </a>
            </li>
          </ul>
        </nav>

        <div className="border-top">
          <li className="nav-item dropdown mb-2 list-unstyled">
            <a
              className={`nav-link d-flex align-items-center py-2 px-3 rounded dropdown-toggle`}
              style={{ cursor: "pointer", width: "100%" }}
              role="button"
              id="profile"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              {!isCollapsed && (
                <span className="flex-grow-1 px-3">{username}</span>
              )}
            </a>
            <ul
              className="dropdown-menu position-fixed m-4"
              aria-labelledby="profile"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <div className="dropdown-divider"></div>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
