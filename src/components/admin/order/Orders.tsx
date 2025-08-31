import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import type { IGetOrderById } from "../../../Interface/IOrder";
import axios from "axios";
import { NumericFormat } from "react-number-format";

const Orders: React.FC = () => {
  const { token } = Store();
  const [orders, setOrders] = useState<IGetOrderById[]>([]);

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
          setOrders(filterOrder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  
  const getOrderTotal = (order: IGetOrderById): number => {
    return order.catsList.reduce((sum, cat) => sum + Number(cat.price), 0);
  };
    
  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">การจัดการคำสั่งซื้อ</h2>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>หมายเลขคำสั่งซื้อ</th>
                <th>เวลาสั่งซื้อ</th>
                <th>ชื่อผู้ใช้</th>
                <th>ราคา</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            {orders.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{new Date(item.orderDateTime).toLocaleString()}</td>
                  <td>{item.username}</td>
                  <td>
                    
                    <NumericFormat
                      value={getOrderTotal(item)}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </td>
                  <td>
                    <a
                      href={`/orders/${item.id}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      ดูข้อมูล
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
