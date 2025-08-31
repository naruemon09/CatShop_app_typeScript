import React, { useEffect, useState } from "react";
import Store from "../store/Store";
import type { IGetOrderById } from "../../Interface/IOrder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Cancel from "./Cancel";

const Orderlist: React.FC = () => {
  const { token } = Store();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IGetOrderById[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get<IGetOrderById[]>(
          "https://localhost:7092/api/Orders/GetAllOrderByUserid",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          const filterOrder = response.data.filter(
            (x) => x.orderStatus !== "ยังไม่ชำระเงิน"
          );
          setOrders(filterOrder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [token]);

  const handleViewDetail = (id: string) => {
    navigate("/ประวัติการสั่งซื้อ/รายละเอียด", { state: { orderid: id } });
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "ชำระเงินแล้ว":
        return 50;
      case "จัดส่งสำเร็จ":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="container my-5 py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">ประวัติการสั่งซื้อ</h2>
      </div>

      {orders.map((order, index) => (
        <section key={order.id || index} className="mb-3">
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
                    <p className="fw-bold mb-1">
                      หมายเลขคำสั่งซื้อ :{" "}
                      <span className="fw-normal">{order.id}</span>
                    </p>
                    <p className="fw-bold mb-1">
                      เวลาสั่งซื้อ :{" "}
                      <span className="fw-normal">
                        {new Date(order.orderDateTime).toLocaleString()}
                      </span>
                    </p>
                    <p className="fw-bold mb-0">
                      เวลารับสินค้า :{" "}
                      <span className="fw-normal">
                        {new Date(order.pickupDateTime).toLocaleString()}
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
                {order.catsList &&
                  order.catsList.map((item, itemIndex) => (
                    <div
                      key={item.catId || itemIndex}
                      className="accordion-body border-top"
                    >
                      <div className="card-body p-4">
                        <div className="d-flex">
                          <div className="me-4 d-flex align-items-center">
                            <img
                              src={`https://localhost:7092/api/Cats/Image/${item.images}`}
                              alt={item.catname}
                              className="img-fluid rounded-4"
                              style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <div className="fw-bold">{item.catname}</div>
                                <div className="text-muted small">
                                  สายพันธุ์ : {item.breedname}
                                </div>
                                <div className="text-muted small mt-2">
                                  <span className="me-3">
                                    เพศ : {item.gender === "0" ? "ชาย" : "หญิง"}
                                  </span>
                                </div>
                              </div>

                              <div className="text-end">
                                <div className="fw-bold">
                                  <NumericFormat
                                    value={item.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"฿ "}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                  />
                                </div>
                              </div>
                            </div>

                            <hr />

                            {item.orderStatus === "ชำระเงินแล้ว" ||
                            item.orderStatus === "จัดส่งสำเร็จ" ? (
                              <div>
                                <div className="small text-muted fw-bold mb-2">
                                  ติดตามคำสั่งซื้อ
                                </div>

                                <div className="mb-2">
                                  <div
                                    className="progress"
                                    style={{ height: 8, borderRadius: 10 }}
                                  >
                                    <div
                                      className="progress-bar bg-primary"
                                      role="progressbar"
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
                                    <div>สั่งซื้อ</div>
                                  </div>
                                  <div
                                    style={{ width: 100 }}
                                    className={
                                      item.orderStatus === "ชำระเงินแล้ว"
                                        ? "text-primary text-center"
                                        : "text-center"
                                    }
                                  >
                                    <div>ชำระเงินแล้ว</div>
                                  </div>
                                  <div
                                    style={{ width: 100 }}
                                    className={
                                      item.orderStatus === "จัดส่งสำเร็จ"
                                        ? "text-primary text-end"
                                        : "text-end"
                                    }
                                  >
                                    <div>จัดส่งสำเร็จ</div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-end m-2">
                                <p style={{color: 'red'}}>{item.orderStatus}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        {item.orderStatus === "ชำระเงินแล้ว" ||
                        item.orderStatus === "จัดส่งสำเร็จ" ? (
                          <div className="m-3">
                            <button
                              type="button"
                              onClick={() => setSelectedOrderId(item.orderid)}
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#cancelModal"
                            >
                              ยกเลิก & ขอเงินคืน
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}

                <div className="text-end m-2">
                  <button
                    type="button"
                    onClick={() => handleViewDetail(order.id)}
                    className="btn btn-link text-muted"
                  >
                    รายละเอียด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {selectedOrderId && (
        <Cancel
          orderData={orders
            .flatMap((o) => o.catsList)
            .find((cat) => cat.orderid === selectedOrderId)}
          orderInfo={orders.find((o) =>
            o.catsList.some((cat) => cat.orderid === selectedOrderId)
          )}
          onClose={() => setSelectedOrderId("")}
        />
      )}
    </div>
  );
};

export default Orderlist;
