import React, { useEffect, useState } from "react";
import type { IBilling, IGetOrder } from "../../Interface/IOrder";
import Store from "../store/Store";
import axios from "axios";
import AddressAutocomplete from "./AddressAutocomplete";
import { NumericFormat } from "react-number-format";
import Payment from "./Payment";

const Billing: React.FC = () => {
  const { token } = Store();
  const [orders, setOrders] = useState<IGetOrder[]>([]);
  const totalPrice = orders.reduce((sum, r) => sum + Number(r.price), 0);
  const [form, setForm] = useState<IBilling>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    pickupDateTime: "",
    notes: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get<IBilling>(
          `https://localhost:7092/api/Users/GetUsersByToken`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response", response);
        if (response.status === 200) {
          setForm(response.data);
        }
        const responseOrder = await axios.get<IGetOrder[]>(
          `https://localhost:7092/api/Orders/GetAllOrderByUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (responseOrder.status === 200) {
           const filterOrder = responseOrder.data.filter(
            (x) => x.orderStatus === "ยังไม่ชำระเงิน"
          );
          setOrders(filterOrder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <section className="shopify-cart checkout-wrap">
      <div className="container py-5 my-5">
        <form className="form-group">
          <div className="row d-flex flex-wrap">
            <div className="col-lg-6">
              <h2 className="text-dark pb-3">รายละเอียดการจัดส่ง</h2>
              <div className="billing-details">
                <label>ชื่อ *</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-4 ps-3"
                  value={form.firstname}
                  onChange={(e) =>
                    setForm({ ...form, firstname: e.target.value })
                  }
                />
                <label>นามสกุล *</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-4 ps-3"
                  value={form.lastname}
                  onChange={(e) =>
                    setForm({ ...form, lastname: e.target.value })
                  }
                />
                <label>โทรศัพท์ *</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-4 ps-3"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <label>อีเมล *</label>
                <input
                  type="text"
                  className="form-control mt-2 mb-4 ps-3"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <label>วันที่รับสัตว์เลี้ยง *</label>
                <input
                  type="datetime-local"
                  className="form-control mt-2 mb-4 ps-3"
                  value={form.pickupDateTime}
                  onChange={(e) =>
                    setForm({ ...form, pickupDateTime: e.target.value })
                  }
                />
                <label>ที่อยู่จัดส่ง *</label>
                <textarea
                  className="form-control mt-3 ps-3 mb-3"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
                <div className="mb-4">
                  <h5>ปักหมุดสถานที่จัดส่ง</h5>
                  <AddressAutocomplete
                    onAddressSelect={(address, lat, lng) => {
                      setForm((prev) => ({
                        ...prev,
                        address: address,
                      }));
                      console.log(lat, lng);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="text-dark pb-3">ข้อมูลเพิ่มเติม</h2>
              <div className="billing-details">
                <label>หมายเหตุการสั่งซื้อ (ไม่บังคับ)</label>
                <textarea
                  className="form-control pt-3 pb-3 ps-3 mt-2"
                  placeholder="หมายเหตุเกี่ยวกับคำสั่งซื้อของคุณ เช่น หมายเหตุพิเศษสำหรับการจัดส่ง"
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="your-order mt-5">
                <h2 className="display-7 text-dark pb-3">ยอดรวมในรถเข็น</h2>
                <div className="total-price">
                  <table className="table">
                    <tbody>
                      <tr className="order-total border-bottom pt-2 pb-2 text-uppercase">
                        <th>ยอดรวม</th>
                        <td data-title="Total">
                          <span className="price-amount amount ps-5">
                            <bdi>
                              <span className="price-currency-symbol">
                                <NumericFormat
                                  value={totalPrice}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"฿ "}
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                />
                              </span>
                            </bdi>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <a
                    href="/ชำระเงิน/การจ่าย"
                    className="btn btn-dark btn-lg rounded-1 w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#examplePayment"
                  >
                    สั่งซื้อสินค้า
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Payment totalPrice={totalPrice} form={form} orders={orders}/>
    </section>
  );
};

export default Billing;
