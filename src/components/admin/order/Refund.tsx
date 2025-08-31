import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import { NumericFormat } from "react-number-format";

const Refund: React.FC = ({ paymentId , orderid}) => {
  const { token } = Store();
  const [refund, setRefund] = useState({
    accName: "",
    accNumber: "",
    bankName: "",
    cancelDateTime: "",
    paymentid: "",
    refundFee: 0,
  });

  useEffect(() => {
    const getRefund = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7092/api/Orders/GetCancel/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setRefund(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRefund();
  }, []);

  const handleCancel = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7092/api/Orders/UpdateCancelStatus/${orderid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-4">
      <div className="card bg-white p-4">
        <div>
          <h3 className="fw-bold">คำขอคืนเงิน</h3>
          <div className="row">
            <div className="col-8">
              <p className="fw-bold">
                หมายเลขชำระเงิน :{" "}
                <span className="fw-normal">{refund.paymentid}</span>
              </p>
            </div>
            <div className="col-4">
              <p className="fw-bold">
                เวลาขอคืนเงิน :{" "}
                <span className="fw-normal">
                  {new Date(refund.cancelDateTime).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
          <p className="fw-bold">
            บัญชีธนาคาร : <span className="fw-normal">{refund.bankName}</span>
          </p>
          <p className="fw-bold">
            หมายเลขบัญชี : <span className="fw-normal">{refund.accNumber}</span>
          </p>
          <p className="fw-bold">
            ชื่อบัญชี : <span className="fw-normal">{refund.accName}</span>
          </p>
          <p className="fw-bold">
            จำนวนเงินคืน :{" "}
            <span className="fw-normal">
              <NumericFormat
                value={refund.refundFee}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </span>
          </p>
          <button
            type="button"
            onClick={() => handleCancel()}
            className="btn btn-danger"
          >
            คืนเงินสำเร็จ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Refund;
