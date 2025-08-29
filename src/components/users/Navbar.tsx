import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import Store from "../store/Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { IGetBreeds } from "../../Interface/ICats";
import type { IGetOrder } from "../../Interface/IOrder";

const Navbar: React.FC = () => {
  const { token, username, logout } = Store();

  const handleLogout = () => {
    logout();
  };

  const navigate = useNavigate();

  const [breeds, setBreeds] = useState<IGetBreeds[]>([]);
  const [cats, setCats] = useState<IGetOrder[]>([]);
  const totalPrice = cats.reduce((sum, r) => sum + Number(r.price), 0);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get<IGetBreeds[]>("https://localhost:7092/api/Breeds", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response);
          setBreeds(response.data);
        }
        const responseCat = await axios.get<IGetOrder[]>(
          `https://localhost:7092/api/Orders/GetAllOrderByUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (responseCat.status === 200) {
          const filterOrder = responseCat.data.filter(
            (x) => x.orderStatus === "Pending"
          );
          setCats(filterOrder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBreeds();
  }, [cats , breeds]);

  const handleBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate("/shop", { state: { breedid: event.target.value } });
  };

  return (
    <header>
      <div className="container py-2">
        <div className="row py-4 pb-0 pb-sm-4 align-items-center ">
          <div className="col-sm-4 col-lg-3 text-center text-sm-start">
            <div className="main-logo">
              <a href="">
                <img
                  src="/src/images/cat_logo.png"
                  alt="logo"
                  className="img-fluid"
                />
              </a>
            </div>
          </div>

          <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
            <div className="search-bar border rounded-2 px-3 border-dark-subtle">
              <form
                id="search-form"
                className="text-center d-flex align-items-center"
              >
                <input
                  type="text"
                  className="form-control border-0 bg-transparent"
                  placeholder="Search for more than 10,000 products"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
                  />
                </svg>
              </form>
            </div>
          </div>

          <div className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
            <div className="support-box text-end d-none d-xl-block">
              <span className="fs-6 secondary-font text-muted">Phone</span>
              <h5 className="mb-0">+980-34984089</h5>
            </div>
            <div className="support-box text-end d-none d-xl-block">
              <span className="fs-6 secondary-font text-muted">Email</span>
              <h5 className="mb-0">waggy@gmail.com</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <hr className="m-0" />
      </div>

      <div className="container">
        <nav className="main-menu d-flex navbar navbar-expand-lg">
          <div className="d-flex d-lg-none align-items-end">
            <ul className="d-flex justify-content-end list-unstyled m-0">
              {token ? (
                <li className="nav-item dropdown mb-2">
                  <a
                    className="mx-3"
                    role="button"
                    id="person"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                    >
                      <g fill="currentColor">
                        <path d="M6 36c0-4.965 11.993-8 18-8c6.008 0 18 3.035 18 8v6H6z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M24 26c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10"
                          clip-rule="evenodd"
                        ></path>
                      </g>
                    </svg>
                  </a>

                  <ul className="dropdown-menu m-2" aria-labelledby="person">
                    <li className="m-3">
                      <a className="dropdown-item " href="#">
                        Welcome , {username}
                      </a>
                    </li>

                    <li className="m-3">
                      <a className="dropdown-item" href="/profile">
                        My Account
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
              ) : (
                <a href="/account" className="mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                  >
                    <g fill="currentColor">
                      <path d="M6 36c0-4.965 11.993-8 18-8c6.008 0 18 3.035 18 8v6H6z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M24 26c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10"
                        clip-rule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </a>
              )}

              <li>
                <a
                  href="/cart"
                  className="mx-3"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCart"
                  aria-controls="offcanvasCart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                    ></path>
                  </svg>
                  <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                    {cats.length}
                  </span>
                </a>
              </li>

              <li>
                <a
                  href=""
                  className="mx-3"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSearch"
                  aria-controls="offcanvasSearch"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header justify-content-center">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body justify-content-between">
              <select
                className="filter-categories border-0 mb-0 me-5"
                onChange={(e) => {
                  handleBreed(e);
                }}
              >
                <option>Shop by Breeds</option>
                {breeds.map((item) => (
                  <option value={item.breedid}>{item.breedname}</option>
                ))}
              </select>

              <ul className="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0">
                <li className="nav-item">
                  <a href="/" className="nav-link active">
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    id="pages"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pages
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="pages">
                    <li>
                      <a href="/about" className="dropdown-item">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="/shop" className="dropdown-item">
                        Shop
                      </a>
                    </li>
                    <li>
                      <a href="/checkout" className="dropdown-item">
                        Checkout
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="dropdown-item">
                        Contact
                      </a>
                    </li>
                    <li>
                      {token ?
                        <a href="/profile" className="dropdown-item">
                          Account
                        </a>
                        :
                        <a href="/account" className="dropdown-item">
                          Account
                        </a>
                      }</li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="/shop" className="nav-link">
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/about" className="nav-link">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/contact" className="nav-link">
                    Contact
                  </a>
                </li>
              </ul>

              <div className="d-none d-lg-flex align-items-end">
                <ul className="d-flex justify-content-end list-unstyled m-0">
                  {token ? (
                    <li className="nav-item dropdown mb-2">
                      <a
                        className="mx-3"
                        role="button"
                        id="person"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                        >
                          <g fill="currentColor">
                            <path d="M6 36c0-4.965 11.993-8 18-8c6.008 0 18 3.035 18 8v6H6z"></path>
                            <path
                              fill-rule="evenodd"
                              d="M24 26c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10"
                              clip-rule="evenodd"
                            ></path>
                          </g>
                        </svg>
                      </a>

                      <ul
                        className="dropdown-menu m-2"
                        aria-labelledby="person"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Welcome , {username}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/profile">
                            My Account
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/orderHistory">
                            Order history
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
                  ) : (
                    <li className="nav-item mb-2">
                      <a href="/account" className="mx-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                        >
                          <g fill="currentColor">
                            <path d="M6 36c0-4.965 11.993-8 18-8c6.008 0 18 3.035 18 8v6H6z"></path>
                            <path
                              fill-rule="evenodd"
                              d="M24 26c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10"
                              clip-rule="evenodd"
                            ></path>
                          </g>
                        </svg>
                      </a>
                    </li>
                  )}

                  <li>
                    <a
                      href="/cart"
                      className="mx-3"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasCart"
                      aria-controls="offcanvasCart"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                        ></path>
                      </svg>
                      <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                        {cats.length}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Cart
        cats={cats}
        totalPrice={totalPrice}
      />
    </header>
  );
};

export default Navbar;
