import React from "react";
import type { IGetCats } from "../../Interface/ICats";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import Store from "../store/Store";

const CatCard: React.FC<{ item: IGetCats }> = ({ item }) => {
  const navigate = useNavigate();
  const { token } = Store();

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

  const age = calculateAge(item.birthdate);

  const handleViewDetail = (id: string) => {
    navigate("/ร้านค้า/รายละเอียด", { state: { catid: id , age: age} });
  };

  const onSubmit = async (catId: string) => {
    try {
      const response = await axios.post(
        "https://localhost:7092/api/Orders/CreateOrder",
        { catId },
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
    <div className="card position-relative">
      <img
        src={`https://localhost:7092/api/Cats/Image/${item.images}`}
        className="img-fluid rounded-4"
        alt="image"
      />
      <div className="card-body p-0">
        <div className="d-flex gap-3 align-items-baseline">
          <h3 className="card-title pt-4 m-0">{item.catname}</h3>
          {item.gender === "0" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              color="#6495ED"
              fill="currentColor"
              className="bi bi-gender-male "
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              color="#DE3163"
              fill="currentColor"
              className="bi bi-gender-female"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"
              />
            </svg>
          )}
        </div>

        <div className="card-text">
          <div className="meta-product pt-4">
            <div className="meta-item d-flex align-items-baseline">
              <h6 className="item-title fw-bold no-margin pe-2">สายพันธุ์ : </h6>
              <h6 className="select-item">{item.breedname}</h6>
            </div>
            <div className="meta-item d-flex align-items-baseline">
              <h6 className="item-title fw-bold no-margin pe-2">อายุ : </h6>

              {age.years === 0 ? (
                <h6 className="select-item">{age.months} เดือน</h6>
              ) : (
                <h6 className="select-item">
                  {age.years} ปี / {age.months} เดือน
                </h6>
              )}
            </div>
          </div>
          <h3 className="secondary-font text-primary pt-4">
            <NumericFormat
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"฿ "}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </h3>

          <div className="d-flex flex-wrap mt-3">
            <button
              type="button"
              className="btn-cart me-3 px-4 pt-3 pb-3"
              onClick={() => onSubmit(item.catId)}
            >
              <h5 className="text-uppercase m-0">เพิ่มใส่รถเข็น</h5>
            </button>
            <button
              type="button"
              className="btn-wishlist px-4 p-3"
              onClick={() => handleViewDetail(item.catId)}
            >
              รายละเอียด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
