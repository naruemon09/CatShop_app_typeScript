import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Store from "../../store/Store";
import axios from "axios";
import type { IGetCats } from "../../../Interface/ICats";
import { NumericFormat } from "react-number-format";

const CatsDetail: React.FC = () => {
  const { catid } = useParams();
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
  });

  useEffect(() => {
    const getCat = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7092/api/Cats/GetCatById/${catid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          setCats(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCat();
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
      <h2 className="fw-bold">รายละเอียดสัตว์เลี้ยง</h2>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="m-4">
            <div className="element-header">
              <h2 className="display-6 fw-bold">รหัสแมว : {cats.idnumber}</h2>
            </div>
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
                        prefix={"THB "}
                        decimalScale={2}
                        fixedDecimalScale={true}
                      />
                    </strong>
                  </div>
                  <p>{cats.catdetails}</p>
                  <div className="meta-product pt-4">
                    <div className="meta-item d-flex align-items-baseline">
                      <h6 className="item-title fw-bold no-margin pe-2">
                        สายพันธุ์ :
                      </h6>
                      <ul className="select-list list-unstyled d-flex">
                        <li className="select-item">{cats.breedname}</li>
                      </ul>
                    </div>
                    <div className="meta-item d-flex align-items-baseline">
                      <h6 className="item-title fw-bold no-margin pe-2">
                        เพศ :
                      </h6>
                      <ul className="select-list list-unstyled d-flex">
                        <li className="select-item">
                          {cats.gender === "0" ? "ชาย" : "หญิง"}
                        </li>
                      </ul>
                    </div>
                    <div className="meta-item d-flex align-items-baseline">
                      <h6 className="item-title fw-bold no-margin pe-2">
                        วัน/เดือน/ปี เกิด :
                      </h6>
                      <ul className="select-list list-unstyled d-flex">
                        <li className="select-item">{cats.birthdate}</li>
                      </ul>
                    </div>
                    <div className="meta-item d-flex align-items-baseline">
                      <h6 className="item-title fw-bold no-margin pe-2">
                        อายุ :
                      </h6>
                      <ul className="select-list list-unstyled d-flex">
                        <li className="select-item">
                          {calculateAge(cats.birthdate).years === 0 ? (
                            <h6 className="select-item">
                              {calculateAge(cats.birthdate).months} เดือน
                            </h6>
                          ) : (
                            <h6 className="select-item">
                              {calculateAge(cats.birthdate).years} ปี /{" "}
                              {calculateAge(cats.birthdate).months} เดือน
                            </h6>
                          )}
                        </li>
                      </ul>
                    </div>
                    <div className="meta-item d-flex align-items-baseline">
                      <h6 className="item-title fw-bold no-margin pe-2">
                        ขนาด :
                      </h6>
                      <ul className="select-list list-unstyled d-flex">
                        <li className="select-item">{cats.size}</li>
                      </ul>
                    </div>
                    <div className="meta-item d-flex align-items-baseline">
                      <h6 className="item-title fw-bold no-margin pe-2">
                        สถานะ :
                      </h6>
                      <ul className="select-list list-unstyled d-flex">
                        <li
                          className={`m-2 ${
                            cats.catStatus === "ว่าง"
                              ? "badge bg-success"
                              : cats.catStatus === "ขายแล้ว"
                              ? "badge bg-info"
                              : cats.catStatus === "ป่วย"
                              ? "badge bg-warning"
                              : cats.catStatus === "เสียชีวิต"
                              ? "badge bg-danger"
                              : "badge bg-secondary"
                          }`}
                          style={{
                            color:
                              cats.catStatus === "ว่าง"
                                ? "#198754"
                                : cats.catStatus === "ขายแล้ว"
                                ? "#0dcaf0"
                                : cats.catStatus === "ป่วย"
                                ? "#ffc107"
                                : cats.catStatus === "เสียชีวิต"
                                ? "#dc3545"
                                : "#6c757d",
                          }}
                        >
                          {cats.catStatus}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatsDetail;
