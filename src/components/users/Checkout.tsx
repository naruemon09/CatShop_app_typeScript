import React, { useEffect, useState } from "react";
import Store from "../store/Store";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import type { IGetOrder } from "../../Interface/IOrder";

const Checkout: React.FC = () => {
  const { token } = Store();
  const [orders, setOrders] = useState<IGetOrder[]>([]);

  const totalPrice = orders.reduce((sum, r) => sum + Number(r.price), 0);

  useEffect(() => {
    const getOrder = async () => {
      try {
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
            (x) => x.orderStatus === "ยังไม่ชำระเงิน"
          );
          setOrders(filterOrder);
          console.log(filterOrder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [orders]);

  const handleDelete = async (orderid: string) => {
    try {
      console.log(orderid)
      const response = await axios.delete(
        `https://localhost:7092/api/Orders/DeleteOrderById/${orderid}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="cart" className="my-5 py-5">
      <div className="container">
        <div className="row g-md-5">
          <div className="col-md-8 pe-md-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="card-title text-uppercase">
                    สัตว์เลี้ยง
                  </th>
                  <th scope="col" className="card-title text-uppercase">
                    สายพันธ์ุ
                  </th>
                  <th scope="col" className="card-title text-uppercase">
                    ราคา
                  </th>
                  <th scope="col" className="card-title text-uppercase"></th>
                </tr>
              </thead>
              {orders.map((item, index) => (
                <tbody>
                  <tr key={index}>
                    <td className="py-4">
                      <div className="cart-info d-flex flex-wrap align-items-center">
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
                              {item.catName}
                            </a>
                          </h5>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 align-middle">
                      <div className="align-items-center">
                        <span className="fw-medium text-center p-2 mx-1">
                          {item.breedname}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 align-middle">
                      <div className="total-price">
                        <span className="secondary-font fw-medium">
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
                    <td className="py-4 align-middle">
                      <div className="cart-remove">
                        <button className="border-0 btn" onClick={() => handleDelete(item.orderid)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div className="col-md-4">
            <div className="cart-totals">
              <h2 className="pb-4">ยอดรวมในรถเข็น</h2>
              <div className="total-price pb-4">
                <table className="table text-uppercase">
                  <tbody>
                    <tr className="order-total pt-2 pb-2 border-bottom">
                      <th>ยอดรวม</th>
                      <td data-title="Total">
                        <span className="price-amount amount text-dark ps-5">
                          <bdi>
                            <NumericFormat
                              value={totalPrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"฿ "}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                          </bdi>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="button-wrap row g-2">
                <a
                  href="/ร้านค้า"
                  className="btn btn-dark btn-lg rounded-1 p-3 w-100"
                >
                  ไปที่ร้านค้า
                </a>
                <a
                  href="/ชำระเงิน/ที่อยู่จัดส่ง"
                  className="btn btn-primary p-3 text-uppercase rounded-1 w-100"
                >
                  ดำเนินการชำระเงิน
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
