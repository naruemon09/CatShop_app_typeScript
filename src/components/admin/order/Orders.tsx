import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import type { IGetOrder } from "../../../Interface/IOrder";
import axios from "axios";
import { NumericFormat } from "react-number-format";

const Orders: React.FC = () => {
  const { token } = Store();
  const [orders, setOrders] = useState<IGetOrder[]>([]);

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
          console.log(filterOrder)
          setOrders(filterOrder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Orders Management</h2>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order ID</th>
                <th>Username</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {orders.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.orderId}</td>
                  <td>{item.username}</td>
                  <td>
                    <NumericFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </td>
                  <td
                    className={`m-2 ${
                      item.orderStatus === "Completed"
                        ? "badge bg-success "
                        : item.orderStatus === "Paid"
                        ? "badge bg-info"
                        : item.orderStatus === "Pending"
                        ? "badge bg-warning"
                        : item.orderStatus === "Canceled"
                        ? "badge bg-danger"
                        : "badge bg-secondary"
                    }`}
                    style={{
                      color:
                        item.orderStatus === "Completed"
                          ? "#198754"
                          : item.orderStatus === "Paid"
                          ? "#0dcaf0"
                          : item.orderStatus === "Pending"
                          ? "#ffc107"
                          : item.orderStatus === "Canceled"
                          ? "#dc3545"
                          : "#6c757d",
                    }}
                  >
                    {item.orderStatus}
                  </td>
                  <td>
                    <a
                      href={`/orders/${item.orderId}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      View
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
