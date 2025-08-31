import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import type { ICats, IGetBreeds } from "../../../Interface/ICats";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCats: React.FC = () => {
  const navigate = useNavigate();
  const { token } = Store();
  const [cats, setCats] = useState<ICats>({
    catName: "",
    catdetails: "",
    breedid: "",
    birthdate: "",
    gender: "",
    size: "",
    images: null,
    catStatus: "",
    price: "",
    idnumber: "",
  });

  const [breeds, setBreeds] = useState<IGetBreeds[]>([]);
  const status = ["ว่าง","ขายแล้ว","ป่วย","เสียชีวิต"]

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await axios.get("https://localhost:7092/api/Breeds", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response);
          setBreeds(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBreeds();
  }, []);

  const onSubmit = async () => {
    try {
      
      const formData = new FormData();
      formData.append("catName", cats.catName);
      formData.append("catdetails", cats.catdetails);
      formData.append("breedid", cats.breedid);
      formData.append("birthdate", cats.birthdate);
      formData.append("gender", cats.gender);
      formData.append("size", cats.size);
      formData.append("CatStatus", cats.catStatus);
      formData.append("price", cats.price);
      formData.append("idnumber", cats.idnumber);
      formData.append("image", cats.images);
      
      const response = await axios.post(
        'https://localhost:7092/api/Cats/CreateCat',
        formData ,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response);
      if (response.status == 200) {
        navigate('/cats')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid p-4 vh-100" style={{ height: '100%', overflow: 'hidden' ,overflowY: 'auto'}}>
      <h2 className="fw-bold">เพิ่มแมวใหม่</h2>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="m-4">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">รหัสแมว</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="idnumber"
                  className="form-control"
                  value={cats.idnumber}
                  onChange={(e) =>
                    setCats({ ...cats, idnumber: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">ชื่อ</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="catName"
                  className="form-control"
                  value={cats.catName}
                  onChange={(e) =>
                    setCats({ ...cats, catName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">สายพันธุ์</label>
              <div className="col-sm-10">
                <select
                  className="form-control dropdown-toggle"
                  onChange={(e) =>
                    setCats({ ...cats, breedid: e.target.value })
                  }
                >
                  <option className="dropdown-item">---เลือก สายพันธุ์---</option>

                  {breeds.map((item, index) => (
                    <option
                      key={index}
                      className="dropdown-item"
                      value={item.breedid}
                    >
                      {item.breedname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">รายละเอียด</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  name="catdetails"
                  value={cats.catdetails}
                  onChange={(e) =>
                    setCats({ ...cats, catdetails: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">วัน/เดือน/ปี เกิด</label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  style={{ width: "auto" }}
                  value={cats.birthdate}
                  onChange={(e) =>
                    setCats({ ...cats, birthdate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">เพศ</label>
              <div className="col-sm-10">
                <input
                  type="radio"
                  value={"0"}
                  checked={cats.gender === "0"}
                  onChange={(e) => setCats({ ...cats, gender: e.target.value })}
                />
                <label className="px-2">ชาย</label>
                <input
                  type="radio"
                  value={"1"}
                  checked={cats.gender === "1"}
                  onChange={(e) => setCats({ ...cats, gender: e.target.value })}
                />
                <label className="px-2">หญิง</label>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">ขนาด</label>
              <div className="col-sm-10">
                <label className={`btn me-2
                  ${cats.size === 'S'
                  ? "btn-secondary" 
                  : "btn-outline-secondary"}`}>
                  <input
                    type="radio"
                    className="btn-check"
                    value={"S"}
                    checked={cats.size === "S"}
                    onChange={(e) => setCats({ ...cats, size: e.target.value })}
                  />
                  S
                </label>
                <label className={`btn me-2
                  ${cats.size === 'M'
                  ? "btn-secondary" 
                  : "btn-outline-secondary"}`}>
                  <input
                    type="radio"
                    className="btn-check"
                    value={"M"}
                    checked={cats.size === "M"}
                    onChange={(e) => setCats({ ...cats, size: e.target.value })}
                  />{" "}
                  M
                </label>
                <label className={`btn me-2
                  ${cats.size === 'L'
                  ? "btn-secondary" 
                  : "btn-outline-secondary"}`}>
                  <input
                    type="radio"
                    className="btn-check"
                    value={"L"}
                    checked={cats.size === "L"}
                    onChange={(e) => setCats({ ...cats, size: e.target.value })}
                  />{" "}
                  L
                </label>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">รูปภาพ</label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setCats({ ...cats, images: e.target.files[0] })}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">ราคา</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "auto" }}
                  value={cats.price}
                  onChange={(e) => setCats({ ...cats, price: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">สถานะ</label>
              <div className="col-sm-10">
                <select
                  className="form-control dropdown-toggle"
                  onChange={(e) =>
                    setCats({ ...cats, catStatus: e.target.value })
                  }
                >
                  <option className="dropdown-item">---เลือก สถานะ---</option>

                  {status.map((item) => (
                    <option
                      key={item}
                      className="dropdown-item"
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="text-end">
                <button
                  className="btn btn-success me-2"
                  type="button"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  บันทึก
                </button>
                <a href="/cats" className="btn btn-danger">
                  ยกเลิก
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCats;
