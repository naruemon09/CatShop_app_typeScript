import React, { useEffect, useState } from "react";
import Store from "../store/Store";
import axios from "axios";
import type { IGetOrder } from "../../Interface/IOrder";
import { useLocation } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const OrderDetail: React.FC = () => {
  const location = useLocation();
  const orderId = location.state.orderid;
  const { token } = Store();
  const [orders, setOrders] = useState<IGetOrder>({
    orderId: "",
    orderDateTime: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    pickupDateTime: "",
    orderStatus: "",
    catId: "",
    catname: "",
    breedname: "",
    gender: "",
    birthdate: "",
    size: "",
    images: "",
    price: "",
  });

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
          console.log(response.data);
          setOrders(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "Paid":
        return "/src/images/paid-stamp.png";
      case "Complete":
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

  return (
    <div className="container mx-auto m-4">
      <div className="card bg-white p-4 border shadow-sm">
        <h1 className="fw-bold">Order Detail</h1>
        <div className="row">
          <div className="col-8">
            <p className="fw-bold">
              Order ID : <span className="fw-normal">{orders.orderId}</span>
            </p>
          </div>
          <div className="col-4">
            <p className="fw-bold">
              Order Date :
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
              Name :{" "}
              <span className="fw-normal">
                {orders.firstname} {orders.lastname}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p className="fw-bold">
              Phone : <span className="fw-normal">{orders.phone}</span>
            </p>
          </div>
          <div className="col-4">
            <p className="fw-bold">
              Email : <span className="fw-normal">{orders.email}</span>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <p className="fw-bold">
              Pick Up Date :{" "}
              <span className="fw-normal">
                {new Date(orders.pickupDateTime).toLocaleString()}
              </span>
            </p>
          </div>
          <div className="col-8">
            <p className="fw-bold">
              Address : <span className="fw-normal">{orders.address}</span>
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
                        src={`https://localhost:7092/api/Cats/Image/${orders.images}`}
                        style={{ width: "80px", height: "80px" }}
                        alt="cloth"
                        className="img-fluid"
                      />
                    </div>
                    <div className="card-detail ps-3">
                      <h5 className="card-title">
                        <a className="text-decoration-none">{orders.catname}</a>
                      </h5>
                    </div>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="align-items-center">
                    <span className="fw-medium text-center mx-1">
                      {orders.breedname}
                    </span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="align-items-center">
                    <span className="fw-medium mx-1">
                      {orders.gender === "0" ? "Male" : "Female"}
                    </span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="align-items-center">
                    <span className="fw-medium mx-1">
                      {calculateAge(orders.birthdate).years === 0 ? (
                        <>{calculateAge(orders.birthdate).months} months</>
                      ) : (
                        <>
                          {calculateAge(orders.birthdate).years} years /
                          {calculateAge(orders.birthdate).months} months
                        </>
                      )}
                    </span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="align-items-center">
                    <span className="fw-medium text-center mx-1">
                      {orders.size}
                    </span>
                  </div>
                </td>
                <td className="py-4 align-middle">
                  <div className="total-price">
                    <span className="fw-medium text-center mx-1">
                      <NumericFormat
                        value={orders.price}
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
                    src={`${getStatusProgress(orders.orderStatus)}`}
                    style={{ width: "100px", height: "100px" }}
                    className="img-fluid"
                  />
                </th>
                <th className="fw-bold mx-1">
                  <div className="align-items-center">
                    <NumericFormat
                      value={orders.price}
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
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
