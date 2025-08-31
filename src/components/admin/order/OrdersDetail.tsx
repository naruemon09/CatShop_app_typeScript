import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import type { IGetOrderById } from "../../../Interface/IOrder";
import { useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Refund from "./Refund";

const OrdersDetail: React.FC = () => {
  const { orderId } = useParams();
  const { token } = Store();
  const [orders, setOrders] = useState<IGetOrderById>({
    id: "",
    orderid: "",
    orderDateTime: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    pickupDateTime: "",
    orderStatus: "",
    catsList: [],
  });

  const totalPrice = orders.catsList.reduce(
    (sum, cat) => sum + Number(cat.price),
    0
  );

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7092/api/Orders/GetOrderById/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [orders]);

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

  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <div className="card bg-white p-4">
        <h1 className="fw-bold">รายละเอียดคำสั่งซื้อ</h1>
        <div className="row">
          <div className="col-8">
            <p className="fw-bold">
              หมายเลขคำสั่งซื้อ : <span className="fw-normal">{orderId}</span>
            </p>
          </div>
          <div className="col-4">
            <p className="fw-bold">
              เวลาสั่งซื้อ :
              <span className="fw-normal">
                {" "}
                {new Date(orders.orderDateTime).toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <p className="fw-bold">
              ชื่อ - นามสกุล :{" "}
              <span className="fw-normal">
                {orders.firstname} {orders.lastname}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p className="fw-bold">
              โทรศัพท์ : <span className="fw-normal">{orders.phone}</span>
            </p>
          </div>
          <div className="col-4">
            <p className="fw-bold">
              อีเมล : <span className="fw-normal">{orders.email}</span>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <p className="fw-bold">
              เวลารับสินค้า :{" "}
              <span className="fw-normal">
                {new Date(orders.pickupDateTime).toLocaleString()}
              </span>
            </p>
          </div>
          <div className="col-8">
            <p className="fw-bold">
              สถานที่รับสินค้า :{" "}
              <span className="fw-normal">{orders.address}</span>
            </p>
          </div>
        </div>

        <div>
          <table className="table m-4">
            <thead>
              <tr>
                <th className="card-title text-uppercase">สัตว์เลี้ยง</th>
                <th className="card-title text-uppercase">สายพันธ์ุ</th>
                <th className="card-title text-uppercase">เพศ</th>
                <th className="card-title text-uppercase">อายุ</th>
                <th className="card-title text-uppercase">ขนาด</th>
                <th className="card-title text-uppercase">ราคา</th>
                <th className="card-title text-uppercase">สถานะ</th>
              </tr>
            </thead>

            <tbody>
              {orders.catsList.map((item) => (
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
                          <a className="text-decoration-none">{item.catname}</a>
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
                          <>{calculateAge(item.birthdate).months} เดือน</>
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
      {orders.catsList.map((item) => (
        item.orderStatus === "ขอเงินคืน" && <Refund paymentId={item.paymentId} orderid={item.orderid}/>
      ))}
    </div>
  );
};

export default OrdersDetail;
