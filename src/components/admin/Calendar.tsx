import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { Modal, Button } from "react-bootstrap";
import Store from "../store/Store";
import type { IGetOrder } from "../../Interface/IOrder";
import axios from "axios";
import { NumericFormat } from "react-number-format";

interface EventInput {
  title: string;
  start: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IGetOrder | null>(null);
  const { token } = Store();

  const getRandomColor = () => {
    const colors = ["#FFB6C1", "#FFD700", "#87CEFA", "#90EE90", "#DDA0DD"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get<IGetOrder[]>(
          "https://localhost:7092/api/Orders/GetAllOrder",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const filterOrder = response.data.filter(
            (x) => x.orderStatus !== "Pending"
          );
          console.log(filterOrder);
          const orderEvents = filterOrder.map((order) => ({
            title: `Order by : ${order.username}`,
            start: order.pickupDateTime,
            backgroundColor: getRandomColor(),
            // borderColor: "transparent",
            extendedProps: order,
          }));
          setEvents(orderEvents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [token]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps as IGetOrder);
    setShowDetailModal(true);
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "Paid":
        return "/src/images/paid-stamp.png";
      case "Completed":
        return "/src/images/complete-stamp.png";
      case "Canceled":
        return "/src/images/cancelled-stamp.png";
    }
  };

  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  const onSubmit = async (orderId:string) => {
    try {
      console.log("orderId",orderId)
      console.log("token",token)
      const response = await axios.put(
        `https://localhost:7092/api/Orders/UpdateOrderById/${orderId}`,{},
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      console.log(response);
      // if (response.data === "Create Success") {

      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <div className="card bg-white p-4">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrap5Plugin,
          ]}
          themeSystem="bootstrap"
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          eventClick={handleEventClick}
          height="auto"
        />

        <Modal
          show={showDetailModal}
          onHide={() => setShowDetailModal(false)}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent && (
              <div className="m-2 w-auto">
                <div className="row">
                  <div className="col-8">
                    <p className="fw-bold">
                      Order ID :{" "}
                      <span className="fw-normal">{selectedEvent.orderId}</span>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="fw-bold">
                      Order Date :
                      <span className="fw-normal">
                        {" "}
                        {new Date(selectedEvent.orderDateTime).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <p className="fw-bold">
                      Name :{" "}
                      <span className="fw-normal">
                        {selectedEvent.firstname} {selectedEvent.lastname}
                      </span>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="fw-bold">
                      Phone :{" "}
                      <span className="fw-normal">{selectedEvent.phone}</span>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="fw-bold">
                      Email :{" "}
                      <span className="fw-normal">{selectedEvent.email}</span>
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <p className="fw-bold">
                      Pick Up Date :{" "}
                      <span className="fw-normal">
                        {new Date(
                          selectedEvent.pickupDateTime
                        ).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="col-8">
                    <p className="fw-bold">
                      Address :{" "}
                      <span className="fw-normal">{selectedEvent.address}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <table className="table m-4">
                    <thead>
                      <tr>
                        <th className="card-title text-uppercase">Product</th>
                        <th className="card-title text-uppercase">Breed</th>
                        <th className="card-title text-uppercase">Gender</th>
                        <th className="card-title text-uppercase">Age</th>
                        <th className="card-title text-uppercase">Size</th>
                        <th className="card-title text-uppercase">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-4">
                          <div className="cart-info d-flex flex-wrap align-items-center ">
                            <div className="card-image">
                              <img
                                src={`https://localhost:7092/api/Cats/Image/${selectedEvent.images}`}
                                style={{ width: "80px", height: "80px" }}
                                alt="cloth"
                                className="img-fluid"
                              />
                            </div>
                            <div className="card-detail ps-3">
                              <h5 className="card-title">
                                <a className="text-decoration-none">
                                  {selectedEvent.catname}
                                </a>
                              </h5>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 align-middle">
                          <div className="align-items-center">
                            <span className="fw-medium text-center mx-1">
                              {selectedEvent.breedname}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 align-middle">
                          <div className="align-items-center">
                            <span className="fw-medium mx-1">
                              {selectedEvent.gender === "0" ? "Male" : "Female"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 align-middle">
                          <div className="align-items-center">
                            <span className="fw-medium mx-1">
                              {calculateAge(selectedEvent.birthdate).years ===
                              0 ? (
                                <>
                                  {calculateAge(selectedEvent.birthdate).months}{" "}
                                  months
                                </>
                              ) : (
                                <>
                                  {calculateAge(selectedEvent.birthdate).years}{" "}
                                  years /
                                  {calculateAge(selectedEvent.birthdate).months}{" "}
                                  months
                                </>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 align-middle">
                          <div className="align-items-center">
                            <span className="fw-medium text-center mx-1">
                              {selectedEvent.size}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 align-middle">
                          <div className="total-price">
                            <span className="fw-medium text-center mx-1">
                              <NumericFormat
                                value={selectedEvent.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr className="py-4 align-middle">
                        <th className="card-title text-uppercase">Subtotal</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th className="text-end">
                          <img
                            src={`${getStatusProgress(
                              selectedEvent.orderStatus
                            )}`}
                            style={{ width: "100px", height: "100px" }}
                            className="img-fluid"
                          />
                        </th>
                        <th className="fw-bold mx-1">
                          <div className="align-items-center">
                            <NumericFormat
                              value={selectedEvent.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"THB "}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                          </div>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  {selectedEvent.orderStatus === "Paid" && (
                    <Button
                      variant="success"
                      onClick={() => onSubmit(selectedEvent.orderId)}
                    >
                      ลูกค้าได้รับสินค้าแล้ว
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDetailModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Calendar;
