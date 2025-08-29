import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import CreditCard from "./CreditCard";
import PromptPay from "./PromptPay";
import type { IAmount } from "../../Interface/IPayment";
import axios from "axios";
import Store from "../store/Store";
import { useNavigate } from "react-router-dom";

const Payment: React.FC<IAmount> = ({ totalPrice, form, orders }) => {
  const { token } = Store();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("CreditCard");

  const [valid, setValid] = useState(null);

  const onSubmit = async () => {
    try {
      if (valid !== null) {
        const formData = {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          phone: form.phone,
          address: form.address,
          pickupDateTime: form.pickupDateTime,
          notes: form.notes,
          orderidList: orders.map(o => ({ orderid: o.orderId }))
        };
        const response = await axios.put(
          `https://localhost:7092/api/Orders/UpdateOrderDetails`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          navigate("/orderHistory");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="examplePayment"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="container px-4 mb-2">
            <div className="text-center bg-light rounded py-3">
              <h5 className="text-sm text-gray-600">Total Amount</h5>
              <h5 className="text-2xl fw-bold text-gray-900">
                <NumericFormat
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿ "}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </h5>
            </div>
          </div>

          <div className="px-4">
            <ul className="nav nav-pills bg-light rounded p-1" role="tablist">
              <li
                className="nav-item flex-fill text-center"
                role="presentation"
              >
                <button
                  className={`nav-link w-100 d-flex align-items-center justify-content-center ${
                    activeTab === "CreditCard" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("CreditCard")}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 56 56"
                  >
                    <path
                      fill="currentColor"
                      d="M2.266 17.734h51.468v-2.18c0-4.827-2.46-7.265-7.359-7.265H9.625c-4.898 0-7.36 2.438-7.36 7.266Zm0 22.735c0 4.828 2.46 7.242 7.359 7.242h36.75c4.898 0 7.36-2.414 7.36-7.242V23.055H2.264Zm7.828-5.719v-4.336c0-1.312.914-2.25 2.297-2.25h5.742c1.383 0 2.297.938 2.297 2.25v4.336c0 1.336-.914 2.25-2.297 2.25H12.39c-1.383 0-2.297-.914-2.297-2.25"
                    />
                  </svg>
                  <span className="px-2">Credit Card</span>
                </button>
              </li>
              <li
                className="nav-item flex-fill text-center"
                role="presentation"
              >
                <button
                  className={`nav-link w-100 d-flex align-items-center justify-content-center ${
                    activeTab === "PromptPay" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("PromptPay")}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 1920 1792"
                  >
                    <path
                      fill="currentColor"
                      d="m960 0l960 384v128h-128q0 26-20.5 45t-48.5 19H197q-28 0-48.5-19T128 512H0V384zM256 640h256v768h128V640h256v768h128V640h256v768h128V640h256v768h59q28 0 48.5 19t20.5 45v64H128v-64q0-26 20.5-45t48.5-19h59zm1595 960q28 0 48.5 19t20.5 45v128H0v-128q0-26 20.5-45t48.5-19z"
                    />
                  </svg>
                  <span className="px-2">PromptPay</span>
                </button>
              </li>
            </ul>
          </div>
          {activeTab === "CreditCard" ? (
            <CreditCard setValid={setValid} />
          ) : (
            <PromptPay />
          )}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => onSubmit()}
            >
              Pay{" "}
              <NumericFormat
                value={totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
