import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import type { IGetCats } from "../../../Interface/ICats";
import { NumericFormat } from "react-number-format";


const Cats: React.FC = () => {
  const { token } = Store();
  const [cats, setCats] = useState<IGetCats[]>([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get("https://localhost:7092/api/Cats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response);
          setCats(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBreeds();
  }, [cats]);

  const handleDelete = async (catId: string) => {
    try {
      const response = await axios.delete(
        `https://localhost:7092/api/Cats/DeleteCat/${catId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">การจัดการสัตว์เลี้ยง</h2>
        <a href="/addcats" className="btn btn-warning">
          + เพิ่มแมวใหม่
        </a>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>รูปภาพ</th>
                <th>ชื่อ</th>
                <th>สายพันธุ์</th>
                <th>เพศ</th>
                <th>ราคา</th>
                <th>สถานะ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            {cats.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`https://localhost:7092/api/Cats/Image/${item.images}`}
                      style={{ width: "80px", height: "80px" }}
                    />
                  </td>
                  <td>{item.catname}</td>
                  <td>{item.breedname}</td>
                  <td>{item.gender === "0" ? "ชาย" : "หญิง"}</td>
                  <td>
                    <NumericFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </td>
                  <td
                    className={`m-2 ${
                      item.catStatus === "ว่าง"
                        ? "badge bg-success"
                        : item.catStatus === "ขายแล้ว"
                        ? "badge bg-info"
                        : item.catStatus === "ป่วย"
                        ? "badge bg-warning"
                        : item.catStatus === "เสียชีวิต"
                        ? "badge bg-danger"
                        : "badge bg-secondary"
                    }`}
                    style={{
                      color:
                        item.catStatus === "ว่าง"
                          ? "#198754"
                          : item.catStatus === "ขายแล้ว"
                          ? "#0dcaf0"
                          : item.catStatus === "ป่วย"
                          ? "#ffc107"
                          : item.catStatus === "เสียชีวิต"
                          ? "#dc3545"
                          : "#6c757d",
                    }}
                  >
                    {item.catStatus}
                  </td>
                  <td>
                    <a
                      href={`/cats/${item.catId}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      ดูข้อมูล
                    </a>
                    <a
                      href={`/updateCats/${item.catId}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      แก้ไข
                    </a>
                    <button 
                    type="button"
                      onClick={() => handleDelete(item.catId)} 
                      className="btn btn-sm btn-danger">ลบ</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cats;
