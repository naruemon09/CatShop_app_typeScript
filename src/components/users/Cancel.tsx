import React, { useEffect, useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import type { IRefund } from "../../Interface/IPayment";
import type { IGetOrderById } from "../../Interface/IOrder";
import axios from "axios";
import Store from "../store/Store";

interface CancelProps {
  orderData?: {
    orderid: string;
    catId: string;
    catname: string;
    images: string;
    price: number;
    breedname: string;
    gender: string;
  };
  orderInfo?: IGetOrderById;
  onClose: () => void;
}

const Cancel: React.FC<CancelProps> = ({ orderData, orderInfo, onClose }) => {
  const { token } = Store();
  const [bank, setBank] = useState<IRefund>({
    bankName: "",
    accountNumber: "",
    accountName: "",
    refundFee: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const cashback = orderData ? Number(orderData.price) * 0.7 : 0;

  useEffect(() => {
    setBank(prev => ({ ...prev, refundFee: cashback }));
  }, [cashback]);

  const onSubmit = async () => {
    if (!orderData || !bank.bankName || !bank.accountNumber || !bank.accountName) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = {
        ...bank,
        refundFee: cashback,
      };
      const response = await axios.put(
        `https://localhost:7092/api/Orders/Cancle/${orderData.orderid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 200) {
        alert("ส่งคำขอคืนเงินสำเร็จ");
        onClose();
        window.location.reload();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!orderData) {
    return null;
  }

  return (
    <div
      className="modal fade show"
      id="cancelModal"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      aria-labelledby="cancelModalLabel"
      aria-hidden="false"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex align-items-center">
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
              <h5 className="fw-bold m-2 mb-0">ยกเลิกสินค้าและขอคืนเงิน</h5>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="container p-4">
            <div className="bg-light rounded p-3">
              <div className="m-2">
                <h5 className="fw-bold">ข้อมูลการสั่งซื้อ</h5>
                <p className="mb-1">
                  หมายเลขคำสั่งซื้อ : <span>{orderData.orderid}</span>
                </p>
                <p className="mb-1">
                  เวลาสั่งซื้อ :{" "}
                  <span>{orderInfo ? new Date(orderInfo.orderDateTime).toLocaleString() : "-"}</span>
                </p>
                
                <p className="mb-1">
                  สัตว์เลี้ยง :{" "}
                  <span>
                    {orderData.catname} ({orderData.breedname})
                  </span>
                </p>
                <p className="mb-1">
                  ราคา :{" "}
                  <span>
                    <NumericFormat
                      value={orderData.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿ "}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </span>
                </p>
                
                <hr />
                <p className="mb-0 fw-bold">
                  จำนวนเงินคืน (70%) :{" "}
                  <span className="">
                    <NumericFormat
                      value={cashback}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿ "}
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
              <div className="mb-4 d-flex align-items-center" style={{ fontSize: "20px" }}>
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
                  ข้อมูลบัญชีธนาคารสำหรับการคืนเงิน
                </span>
              </div>

              <div className="mb-3">
                <label className="form-label">ชื่อธนาคาร *</label>
                <select
                  className="form-control ps-3"
                  value={bank.bankName}
                  onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                  required
                >
                  <option value="">เลือกธนาคาร</option>
                  <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
                  <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                  <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
                  <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                  <option value="ธนาคารทหารไทย">ธนาคารทหารไทย</option>
                  <option value="ธนาคารกรุงศรีอยุธยา">ธนาคารกรุงศรีอยุธยา</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
                
                {bank.bankName === 'อื่นๆ' && (
                  <input
                    type="text"
                    className="form-control mt-2 ps-3"
                    placeholder="ระบุชื่อธนาคาร"
                    value={bank.bankName === 'อื่นๆ' ? '' : bank.bankName}
                    onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                  />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">หมายเลขบัญชี *</label>
                <PatternFormat
                  format="###-#-#####-#"
                  type="text"
                  className="form-control ps-3"
                  placeholder="xxx-x-xxxxx-x"
                  value={bank.accountNumber}
                  onValueChange={(values) => {
                    setBank({ ...bank, accountNumber: values.value });
                  }}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">ชื่อผู้ถือบัญชี *</label>
                <input
                  type="text"
                  className="form-control ps-3"
                  placeholder="ชื่อ-นามสกุล ผู้ถือบัญชี"
                  value={bank.accountName}
                  onChange={(e) =>
                    setBank({ ...bank, accountName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onSubmit}
              disabled={isSubmitting || !bank.bankName || !bank.accountNumber || !bank.accountName}
            >
              {isSubmitting ? "กำลังส่ง..." : "ส่งคำขอคืนเงิน"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;