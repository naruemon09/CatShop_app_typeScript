import React, { useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import type { ICancel, IRefund } from "../../Interface/IPayment";
import axios from "axios";
import Store from "../store/Store";

const Cancel: React.FC<ICancel> = ({ orders }) => {
  const { token } = Store();
  const [bank, setBank] = useState<IRefund>({
    bankName: "",
    accountNumber: "",
    accountName: "",
    refundFee: 0,
  });

  const cashback = Number(orders.price) * 0.7;

  const onSubmit = async () => {
    try {
      const formData = {
        ...bank,
        refundFee: cashback,
      };
      const response = await axios.put(
        `https://localhost:7092/api/Orders/Cancle/${orders.orderId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="exampleCancel"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#f60a0a"
                d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
            <h5 className="fw-bold m-2">Cancel Product & Request Refund</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="container p-4">
            <div className="bg-light rounded p-3">
              <div className="m-2">
                <h5 className="fw-bold">Order Information</h5>
                <p className="mb-0">
                  Order ID : <span>{orders.orderId}</span>
                </p>
                <p className="mb-0">
                  Order Date :{" "}
                  <span>{new Date(orders.orderDateTime).toLocaleString()}</span>
                </p>
                <p className="mb-0">
                  Cat :{" "}
                  <span>
                    {orders.catname} ({orders.breedname})
                  </span>
                </p>
                <p className="mb-0">
                  Amount :{" "}
                  <span>
                    <NumericFormat
                      value={orders.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"THB "}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </span>
                </p>
                <p className="mb-0">
                  Cachback Amount (70%) :{" "}
                  <span>
                    <NumericFormat
                      value={bank.refundFee}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"THB "}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="px-4">
              <div className="mb-4" style={{ fontSize: "20px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M11.5 1L2 6v2h19V6m-5 4v7h3v-7M2 22h19v-3H2m8-9v7h3v-7m-9 0v7h3v-7z"
                  />
                </svg>
                <span className="fw-bold flex-grow-1 px-3">
                  Bank Account Information for Refund
                </span>
              </div>

              <label>Bank Name *</label>
              <select
                className="form-control mt-2 mb-4 ps-3"
                value={bank.bankName}
                onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
              >
                <option value="">Select Bank</option>
                <option value="Kasikorn Bank">Kasikorn Bank</option>
                <option value="Bangkok Bank">Bangkok Bank</option>
                <option value="Siam Commercial Bank">
                  Siam Commercial Bank
                </option>
                <option value="Krung Thai Bank">Krung Thai Bank</option>
                <option value="TMB Bank">TMB Bank</option>
                <option value="Krungsri Bank">Krungsri Bank</option>
              </select>
              <label>Account Number *</label>
              <PatternFormat
                format="###-#-#####-#"
                type="text"
                className="form-control mt-2 mb-4 ps-3"
                value={bank.accountNumber}
                onChange={(e) =>
                  setBank({ ...bank, accountNumber: e.target.value })
                }
              />
              <label>Account Holder Name *</label>
              <input
                type="text"
                className="form-control mt-2 mb-4 ps-3"
                value={bank.accountName}
                onChange={(e) =>
                  setBank({ ...bank, accountName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary w-100 fw-bold"
              onClick={() => onSubmit()}
            >
              Submit Refund Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
