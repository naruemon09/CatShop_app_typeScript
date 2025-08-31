import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { IRegister } from "../../../Interface/IAuth";

const UserDetail = () => {
  const { userid } = useParams();
  console.log(userid);
  const { token } = Store();
  console.log(token);
  const [form, setForm] = useState<IRegister>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    birthdate: "",
    phone: "",
    address: "",
    provinceId: 0,
    districtId: 0,
    subdistrictId: 0,
    zipcode: 0,
    password: "",
    gender: "",
    userStatus: "",
    roleList: [],
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7092/api/Users/GetUsersById/${userid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          setForm(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
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
      <h2 className="fw-bold">รายละเอียดลูกค้า</h2>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="row g-4">
            <div className="col-md-4">
              <label className="fw-bold">ชื่อผู้ใช้</label>
              <p>{form.username}</p>
            </div>
            <div className="col-md-4">
              <label className="fw-bold">ชื่อ - นามสกุล</label>
              <p>
                {form.firstname} {form.lastname}
              </p>
            </div>
            <div className="col-md-4">
              <label className="fw-bold">อายุ</label>
              <p>{calculateAge(form.birthdate).years} ปี</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <label className="fw-bold">วัน /เดือน / ปี เกิด</label>
              <p>{form.birthdate}</p>
            </div>
            <div className="col-md-4">
              <label className="fw-bold">เพศ</label>
              <p>{form.gender === "0" ? "ชาย" : "หญิง"}</p>
            </div>
            <div className="col-md-4">
              <label className="fw-bold">อีเมล</label>
              <p>{form.email}</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <label className="fw-bold">โทรศัพท์</label>
              <p>{form.phone}</p>
            </div>

            <div className="col-md-8">
              <label className="fw-bold">ที่อยู่</label>
              <p>{form.addressfull}</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <label className="fw-bold">สถานะ</label>
              <div>
                <p
                  className={`badge
                      ${
                        form.userStatus === "ใช้งานอยู่"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                  style={{
                    color: form.userStatus === "ใช้งานอยู่" ? "#198754" : "#dc3545",
                  }}
                >
                  {form.userStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
