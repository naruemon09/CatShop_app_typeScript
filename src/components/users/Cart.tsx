import React from "react";
import { NumericFormat } from "react-number-format";
import type { CartProps } from "../../Interface/ICats";

const Cart: React.FC <CartProps> = ({cats , totalPrice}) => {

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      id="offcanvasCart"
      aria-labelledby="My Cart"
      aria-modal="false"
      role="dialog"
    >
      <div className="offcanvas-header justify-content-center">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">รถเข็น</span>
              <span className="badge bg-primary rounded-circle pt-2">{cats.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {cats.map((item) => (
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.catName}</h6>
                  <small className="text-body-secondary">
                    {item.breedname}
                  </small>
                </div>
                <span className="text-body-secondary">
                  <NumericFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span className="fw-bold">ยอดรวม (บาท)</span>
              <strong>
                <NumericFormat
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿ "}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </strong>
            </li>
          </ul>

          <a href="/ชำระเงิน" className="w-100 btn btn-primary btn-lg" type="submit">
            ดำเนินการชำระเงิน
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
