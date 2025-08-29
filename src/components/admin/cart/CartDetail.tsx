import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import Store from "../../store/Store";
import type { IGetCart } from "../../../Interface/IOrder";
import axios from "axios";

const CartDetail: React.FC = () => {
  const { cartid } = useParams();
  const { token } = Store();
  const [carts, setCarts] = useState<IGetCart>({
    cartId: "",
    orderId: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    orderStatus: "",
    catsList: [],
  });

  const totalPrice = carts.catsList.reduce(
    (sum, r) => sum + Number(r.price),
    0
  );

  useEffect(() => {
    const getCarts = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7092/api/Orders/GetCartById/${cartid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setCarts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCarts();
  }, []);

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
        <h1 className="fw-bold">Cart Detail</h1>
        <div className="">
          <p className="fw-bold">
            Cart ID : <span className="fw-normal">{carts.cartId}</span>
          </p>
        </div>

        <div className="row">
          <div className="col-4">
            <p className="fw-bold">
              Name :
              <span className="fw-normal">
                {carts.firstname} {carts.lastname}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p className="fw-bold">
              Phone : <span className="fw-normal">{carts.phone}</span>
            </p>
          </div>
          <div className="col-4">
            <p className="fw-bold">
              Email : <span className="fw-normal">{carts.email}</span>
            </p>
          </div>
        </div>

        <div>
          <p className="fw-bold">
            Address : <span className="fw-normal">{carts.address}</span>
          </p>
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
              {carts.catsList.map((item, index) => (
                <tr key={index}>
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
                      <span className="fw-medium mx-1">
                        {item.breedname}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 align-middle">
                    <div className="align-items-center">
                      <span className="fw-medium mx-1">
                        {item.gender === "0" ? "Male" : "Female"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 align-middle">
                    <div className="align-items-center">
                      <span className="fw-medium mx-1">
                        {calculateAge(item.birthdate).years === 0 ? (
                          <>
                            {calculateAge(item.birthdate).months} months
                          </>
                        ) : (
                          <>
                            {calculateAge(item.birthdate).years} years /
                            {calculateAge(item.birthdate).months} months
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
                </tr>
              ))}
              <tr className="py-4 align-middle">
                <th className="card-title text-uppercase">Subtotal</th>
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

export default CartDetail;
