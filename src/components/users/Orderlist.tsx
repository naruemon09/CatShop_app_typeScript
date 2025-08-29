import React, { useEffect, useState } from "react";
import Store from "../store/Store";
import type { IGetOrder } from "../../Interface/IOrder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Cancel from "./Cancel";

const Orderlist: React.FC = () => {
  const { token } = Store();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IGetOrder[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get<IGetOrder[]>(
          "https://localhost:7092/api/Orders/GetAllOrderByUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          const filterOrder = response.data.filter(
            (x) => x.orderStatus !== "Pending"
          );
          console.log(filterOrder);
          setOrders(filterOrder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handleViewDetail = (id: string) => {
    navigate("/orderHistory/detail", { state: { orderid: id } });
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "Paid":
        return 50;
      case "Complete":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="container my-5 py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Orders History</h2>
      </div>

      {orders.map((item, index) => (
        <section key={index} className="mb-3">
          <div className="accordion">
            <div className="accordion-item border rounded shadow-sm">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  <div>
                    <p className="fw-bold">
                      Order ID :{" "}
                      <span className="fw-normal">{item.orderId}</span>
                    </p>
                    <p className="fw-bold">
                      Pick Up Date :{" "}
                      <span className="fw-normal">
                        {new Date(item.pickupDateTime).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
              >
                <div className="accordion-body border-top">
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <div className="me-4 d-flex align-items-center">
                        <img
                          src={`https://localhost:7092/api/Cats/Image/${item.images}`}
                          className="img-fluid rounded-4"
                          style={{ width: "200px" }}
                        />
                      </div>

                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <div className="fw-bold">{item.catname}</div>
                            <div className="text-muted small">
                              Breed : {item.breedname}
                            </div>
                            <div className="text-muted small mt-2">
                              <span className="me-3">
                                Gender :{" "}
                                {item.gender === "0" ? "Male" : "Female"}
                              </span>
                            </div>
                          </div>

                          <div className="text-end">
                            <div className="fw-bold">
                              <NumericFormat
                                value={item.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"THB "}
                                decimalScale={2}
                                fixedDecimalScale={true}
                              />
                            </div>
                          </div>
                        </div>

                        <hr />

                        <div>
                          <div className="small text-muted fw-bold mb-2">
                            Track Order
                          </div>

                          <div className="mb-2">
                            <div
                              className="progress"
                              style={{ height: 8, borderRadius: 10 }}
                            >
                              <div
                                className="progress-bar bg-primary"
                                role={"progressbar"}
                                style={{
                                  width: `${getStatusProgress(
                                    item.orderStatus
                                  )}%`,
                                  borderRadius: 10,
                                }}
                                aria-valuenow={item.orderStatus}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between small text-muted">
                            <div
                              style={{ width: 100 }}
                              className={
                                item.orderStatus === "other"
                                  ? "text-primary text-center"
                                  : "text-start"
                              }
                            >
                              <div></div>
                            </div>
                            <div
                              style={{ width: 100 }}
                              className={
                                item.orderStatus === "Paid"
                                  ? "text-primary text-center"
                                  : "text-center"
                              }
                            >
                              <div>Paid</div>
                            </div>
                            <div
                              style={{ width: 100 }}
                              className={
                                item.orderStatus === "Complete"
                                  ? "text-primary text-end"
                                  : "text-end"
                              }
                            >
                              <div>Complete</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-body border-top d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    onClick={() => handleViewDetail(item.orderId)}
                    className="btn btn-link text-muted"
                  >
                    View Detail
                  </button>
                  <a
                    href="/cancel"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target=".bd-example-modal-lg"
                  >
                    Cancel & Refund
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Cancel orders={item}/>
        </section>
      ))}
      
    </div>
  );
};

export default Orderlist;
