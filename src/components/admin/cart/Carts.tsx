import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import type { IGetCart } from "../../../Interface/IOrder";
import axios from "axios";

const Carts: React.FC = () => {
  const { token } = Store();
  const [carts, setCarts] = useState<IGetCart[]>([]);

  useEffect(() => {
    const getCarts = async () => {
      try {
        const response = await axios.get<IGetCart[]>(
          "https://localhost:7092/api/Orders/GetAllCart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          const filterCarts = response.data.filter(
            (x) => x.orderStatus === "ยังไม่ชำระเงิน"
          );
          setCarts(filterCarts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCarts();
  }, []);

  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">การจัดการตะกร้าสินค้า</h2>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>รหัสตะกร้าสินค้า</th>
                <th>ชื่อผู้ใช้</th>
                <th>จำนวน</th>
                <th>สถานะ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            {carts.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.cartId}</td>
                  <td>{item.username}</td>
                  <td>{item.catsList.length}</td>
                  <td
                    className={`m-2 ${
                      item.orderStatus === "จัดส่งสำเร็จ"
                        ? "badge bg-success"
                        : item.orderStatus === "ชำระเงินแล้ว"
                        ? "badge bg-info"
                        : item.orderStatus === "ยังไม่ชำระเงิน"
                        ? "badge bg-warning"
                        : item.orderStatus === "ยกเลิกสำเร็จ"
                        ? "badge bg-danger"
                        : "badge bg-secondary"
                    }`}
                    style={{
                      color:
                        item.orderStatus === "จัดส่งสำเร็จ"
                          ? "#198754"
                          : item.orderStatus === "ชำระเงินแล้ว"
                          ? "#0dcaf0"
                          : item.orderStatus === "ยังไม่ชำระเงิน"
                          ? "#ffc107"
                          : item.orderStatus === "ยกเลิกสำเร็จ"
                          ? "#dc3545"
                          : "#6c757d",
                    }}
                  >
                    {item.orderStatus}
                  </td>
                  <td>
                    <a
                      href={`/carts/${item.cartId}`}
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

export default Carts;
