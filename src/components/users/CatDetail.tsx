import React, { useEffect, useState } from "react";
import Store from "../store/Store";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import type { IGetCats } from "../../Interface/ICats";

const CatDetail: React.FC = () => {
  const location = useLocation();
  const catId = location.state.catid;
  const age = location.state.age;
  console.log(catId);
  const { token } = Store();
  const [cats, setCats] = useState<IGetCats>({
    catId: "",
    catname: "",
    catdetails: "",
    breedid: "",
    breedname: "",
    birthdate: "",
    gender: "",
    size: "",
    images: null,
    catStatus: "",
    price: "",
    idnumber: "",
    addDateTime: ""
  });

  useEffect(() => {
    const getCats = async () => {
      try {
        const response = await axios.get<IGetCats>(
          `https://localhost:7092/api/Cats/GetCatById/${catId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setCats(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCats();
  }, []);

  const onSubmit = async (catid: string) => {
    try {
      const response = await axios.post(
        "https://localhost:7092/api/Orders/CreateOrder",
        { catid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="selling-product">
      <div className="container my-md-5 py-5">
        <div className="row g-md-5">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-12">
                <img
                  src={`https://localhost:7092/api/Cats/Image/${cats.images}`}
                  className="img-fluid"
                  style={{ width: "600px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-5 ">
            <div className="product-info">
              <div className="element-header">
                <h2 className="display-6 fw-bold">{cats.catname}</h2>
              </div>
              <div className="product-price pt-3 pb-3">
                <strong className="text-primary display-6">
                  <NumericFormat
                    value={cats.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"฿ "}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </strong>
              </div>
              <p>{cats.catdetails}</p>
              <div className="meta-product pt-4">
                <div className="meta-item d-flex align-items-baseline">
                  <h6 className="item-title fw-bold no-margin pe-2">สายพันธ์ุ :</h6>
                  <ul className="select-list list-unstyled d-flex">
                    <li className="select-item">{cats.breedname}</li>
                  </ul>
                </div>
                <div className="meta-item d-flex align-items-baseline">
                  <h6 className="item-title fw-bold no-margin pe-2">เพศ :</h6>
                  <ul className="select-list list-unstyled d-flex">
                    <li className="select-item">
                      {cats.gender === "0" ? "ชาย" : "หญิง"}
                    </li>
                  </ul>
                </div>
                <div className="meta-item d-flex align-items-baseline">
                  <h6 className="item-title fw-bold no-margin pe-2">
                    Birthdate :
                  </h6>
                  <ul className="select-list list-unstyled d-flex">
                    <li className="select-item">{cats.birthdate}</li>
                  </ul>
                </div>
                <div className="meta-item d-flex align-items-baseline">
                  <h6 className="item-title fw-bold no-margin pe-2">อายุ :</h6>
                  <ul className="select-list list-unstyled d-flex">
                    <li className="select-item">
                      {age.years === 0 ? (
                        <h6 className="select-item">{age.months} เดือน</h6>
                      ) : (
                        <h6 className="select-item">
                          {age.years} ปี / {age.months} เดือน
                        </h6>
                      )}
                    </li>
                  </ul>
                </div>
                <div className="meta-item d-flex align-items-baseline">
                  <h6 className="item-title fw-bold no-margin pe-2">ขนาด :</h6>
                  <ul className="select-list list-unstyled d-flex">
                    <li className="select-item">{cats.size}</li>
                  </ul>
                </div>
              </div>
              <div className="cart-wrap">
                <div className="d-flex flex-wrap pt-4">
                  <button
                    className="btn-cart me-3 px-4 pt-3 pb-3"
                    onClick={() => onSubmit(cats.catId)}
                  >
                    <h5 className="text-uppercase m-0">เพิ่มใส่รถเข็น</h5>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatDetail;
