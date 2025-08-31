import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { Modal, Button } from "react-bootstrap";
import Store from "../store/Store";
import type { IGetOrder, IGetOrderById } from "../../Interface/IOrder";
import axios from "axios";
import { NumericFormat } from "react-number-format";

interface EventInput {
  title: string;
  start: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IGetOrderById | null>(null);
  const { token } = Store();

  const getRandomColor = () => {
    const colors = ["#FFB6C1", "#FFD700", "#87CEFA", "#90EE90", "#DDA0DD"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get<IGetOrderById[]>(
          "https://localhost:7092/api/Orders/GetAllOrder",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const filterOrder = response.data.filter(
            (x) => x.orderStatus !== "ยังไม่ชำระเงิน"
          );
          console.log(filterOrder);
          const orderEvents = filterOrder.map((order) => ({
            title: `ส่ง ${order.catsList.length} ตัว`,
            start: order.pickupDateTime,
            backgroundColor: getRandomColor(),
            extendedProps: order,
          }));
          setEvents(orderEvents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const totalPrice = selectedEvent?.catsList.reduce(
    (sum, cat) => sum + Number(cat.price),
    0
  );

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps as IGetOrder);
    setShowDetailModal(true);
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "ชำระเงินแล้ว":
        return "/src/images/paid-stamp.png";
      case "จัดส่งสำเร็จ":
        return "/src/images/complete-stamp.png";
      case "ขอเงินคืน":
        return "/src/images/full-refund-stamp.png";
      case "ยกเลิกสำเร็จ":
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

  const onSubmit = async (orderId: string) => {
    try {
      console.log("orderId", orderId);
      console.log("token", token);
      const response = await axios.put(
        `https://localhost:7092/api/Orders/UpdateOrderById/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("selectedEvent",selectedEvent)

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
            <Modal.Title>รายละเอียดคำสั่งซื้อ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent && (
              <div className="m-2 w-auto">
                <div className="row">
                  <div className="col-8">
                    <p className="fw-bold">
                      หมายเลขคำสั่งซื้อ :{" "}
                      <span className="fw-normal">{selectedEvent.id}</span>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="fw-bold">
                      เวลาสั่งซื้อ :
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
                      ชื่อ - นามสกุล :{" "}
                      <span className="fw-normal">
                        {selectedEvent.firstname} {selectedEvent.lastname}
                      </span>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="fw-bold">
                      โทรศัพท์ :{" "}
                      <span className="fw-normal">{selectedEvent.phone}</span>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="fw-bold">
                      อีเมล :{" "}
                      <span className="fw-normal">{selectedEvent.email}</span>
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <p className="fw-bold">
                      เวลารับสินค้า :{" "}
                      <span className="fw-normal">
                        {new Date(
                          selectedEvent.pickupDateTime
                        ).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="col-8">
                    <p className="fw-bold">
                      สถานที่รับสินค้า :{" "}
                      <span className="fw-normal">{selectedEvent.address}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <table className="table m-4">
                    <thead>
                      <tr>
                        <th className="card-title text-uppercase">
                          สัตว์เลี้ยง
                        </th>
                        <th className="card-title text-uppercase">สายพันธ์ุ</th>
                        <th className="card-title text-uppercase">เพศ</th>
                        <th className="card-title text-uppercase">อายุ</th>
                        <th className="card-title text-uppercase">ขนาด</th>
                        <th className="card-title text-uppercase">ราคา</th>
                        <th className="card-title text-uppercase">สถานะ</th>
                        <th className="card-title text-uppercase">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEvent.catsList.map((item) => (
                        <tr>
                          <td className="py-4">
                            <div className="cart-info d-flex flex-wrap align-items-center ">
                              <div className="card-image">
                                <img
                                  src={`https://localhost:7092/api/Cats/Image/${item.images}`}
                                  style={{ width: "80px", height: "80px" }}
                                  alt="cloth"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="card-detail ps-3">
                                <h5 className="card-title">
                                  <a className="text-decoration-none">
                                    {item.catname}
                                  </a>
                                </h5>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="align-items-center">
                              <span className="fw-medium text-center mx-1">
                                {item.breedname}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="align-items-center">
                              <span className="fw-medium mx-1">
                                {item.gender === "0" ? "ชาย" : "หญิง"}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="align-items-center">
                              <span className="fw-medium mx-1">
                                {calculateAge(item.birthdate).years === 0 ? (
                                  <>
                                    {calculateAge(item.birthdate).months} เดือน
                                  </>
                                ) : (
                                  <>
                                    {calculateAge(item.birthdate).years} ปี /
                                    {calculateAge(item.birthdate).months} เดือน
                                  </>
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="align-items-center">
                              <span className="fw-medium text-center mx-1">
                                {item.size}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="total-price">
                              <span className="fw-medium text-center mx-1">
                                <NumericFormat
                                  value={item.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                />
                              </span>
                            </div>
                          </td>
                          <td>
                            <img
                              src={`${getStatusProgress(item.orderStatus)}`}
                              style={{ width: "100px", height: "100px" }}
                              className="img-fluid"
                            />
                          </td>
                          <td className="py-4 align-middle">
                            {item.orderStatus === "ชำระเงินแล้ว" && (
                              <Button
                                variant="success"
                                onClick={() => onSubmit(item.orderId)}
                              >
                                ลูกค้าได้รับสินค้าแล้ว
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr className="py-4 align-middle">
                        <th className="card-title text-uppercase">ยอดรวม</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th className="fw-bold mx-1">
                          <div className="align-items-center">
                            <NumericFormat
                              value={totalPrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"฿ "}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                          </div>
                        </th>
                      </tr>
                    </tbody>
                  </table>
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
