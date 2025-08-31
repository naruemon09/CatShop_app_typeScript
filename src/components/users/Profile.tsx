import React, { useEffect, useState } from "react";
import Store from "../store/Store";
import axios from "axios";
import type {
  IDistrict,
  IProvince,
  IRegister,
  ISubdistrict,
} from "../../Interface/IAuth";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { token, logout } = Store();
  const navigate = useNavigate();
  const [province, setProvince] = useState<IProvince[]>([]);
  const [distric, setDistric] = useState<IDistrict[]>([]);
  const [subdistrict, setSubdistrict] = useState<ISubdistrict[]>([]);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState<IRegister>({
    userName: "",
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
    const getUser = async () => {
      try {
        const response = await axios.get(
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
        const provinces = await axios.get(
          "https://localhost:7092/api/Address/GetProvince"
        );
        if (provinces.status === 200) {
          setProvince(provinces.data);
        }
        const districtsResp = await axios.get<IDistrict[]>(
          "https://localhost:7092/api/Address/GetDistrict"
        );
        const filteredDistricts = districtsResp.data.filter(
          (d) => d.provinceId === response.data.provinceId
        );
        console.log(filteredDistricts);
        setDistric(filteredDistricts);

        const subdistrictsResp = await axios.get<ISubdistrict[]>(
          "https://localhost:7092/api/Address/GetSubdistrict"
        );
        const filteredSubdistricts = subdistrictsResp.data.filter(
          (s) => s.districtId === response.data.districtId
        );
        setSubdistrict(filteredSubdistricts);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [edit]);

  const onSubmit = async () => {
    try {
      console.log("user", form);
      const response = await axios.put(
        `https://localhost:7092/api/Users/UpdateUserDetail`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectProvince = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const item = event.target.value;
    setForm({ ...form, provinceId: Number(item) });
    const districs = await axios.get<IDistrict[]>(
      "https://localhost:7092/api/Address/GetDistrict"
    );
    const findDistrics = districs.data.filter(
      (r) => r.provinceId === Number(item)
    );
    setDistric(findDistrics);
  };

  const selectDistric = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const item = event.target.value;
    setForm({ ...form, districtId: Number(item) });
    const subdistricts = await axios.get<ISubdistrict[]>(
      "https://localhost:7092/api/Address/GetSubdistrict"
    );
    const findSubdistrict = subdistricts.data.filter(
      (r) => r.districtId === Number(item)
    );
    setSubdistrict(findSubdistrict);
  };

  const selectSubdistrict = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const item = event.target.value || form.subdistrictId;
    const findZipcode = subdistrict.find((r) => r.id === Number(item))!;
    setForm({
      ...form,
      subdistrictId: findZipcode.id,
      zipcode: findZipcode.zipCode,
    });
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.put(
        "https://localhost:7092/api/Users/updateStatusToken",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        logout();
        navigate("/บัญชีผู้ใช้");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto m-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold">โปรไฟล์</h2>
        {edit === false ? (
          <button
            type="button"
            className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
            onClick={() => setEdit(true)}
          >
            แก้ไขโปรไฟล์
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="card">
        <div className="card bg-white p-4 border shadow-sm">
          <div className="m-2">
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-bold">
                ชื่อผู้ใช้
              </label>
              <div className="col-md-9 mb-3">
                <input
                  type="text"
                  className="form-control-plaintext form-control-lg"
                  value={form.firstname}
                  disabled
                  onChange={(e) =>
                    setForm({ ...form, firstname: e.target.value })
                  }
                  placeholder="กรอก ชื่อผู้ใช้"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-bold">ชื่อ - นามสกุล</label>
              {edit === true ? (
                <>
                  <div className="col-md-4 mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={form.firstname}
                      onChange={(e) =>
                        setForm({ ...form, firstname: e.target.value })
                      }
                      placeholder="กรอก ชื่อ"
                    />
                  </div>

                  <div className="col-md-5 mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={form.lastname}
                      onChange={(e) =>
                        setForm({ ...form, lastname: e.target.value })
                      }
                      placeholder="กรอก นามสกุล"
                    />
                  </div>
                </>
              ) : (
                <div className="col-md-9 mb-3">
                  <label className="px-2">
                    {form.firstname} {form.lastname}
                  </label>
                </div>
              )}
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-bold">
                วัน / เดือน / ปี เกิด
              </label>
              <div className="col-md-9 mb-3">
                <label className="px-2">{form.birthdate}</label>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-bold">เพศ</label>
              <div className="col-md-9 mb-3">
                <label className="px-2">
                  {form.gender === "0" ? "ชาย" : "หญิง"}
                </label>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-bold">โทรศัพท์</label>
              {edit === true ? (
                <div className="col-md-9 mb-3">
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="กรอก หมายเลขโทรศัพท์"
                  />
                </div>
              ) : (
                <div className="col-md-9 mb-3">
                  <label className="px-2">{form.phone}</label>
                </div>
              )}
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-bold">อีเมล</label>
              {edit === true ? (
                <div className="col-md-9 mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="กรอก อีเมล"
                  />
                </div>
              ) : (
                <div className="col-md-9 mb-3">
                  <label className="px-2">{form.email}</label>
                </div>
              )}
            </div>

            {edit === true ? (
              <>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">
                    ที่อยู่
                  </label>

                  <div className="col-md-9 mb-3">
                    <textarea
                      className="form-control form-control-lg"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      placeholder="กรอก ที่อยู่"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col offset-md-3 mb-3">
                    <select
                      className="form-control dropdown-toggle"
                      onChange={(e) => selectProvince(e)}
                      value={form.provinceId}
                    >
                      <option className="dropdown-item">เลือก จังหวัด</option>

                      {province.map((item, index) => (
                        <option
                          key={index}
                          className="dropdown-item"
                          value={item.id}
                        >
                          {item.nameInThai}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col mb-3">
                    <select
                      className="form-control dropdown-toggle"
                      value={form.districtId}
                      onChange={(e) => selectDistric(e)}
                    >
                      <option className="dropdown-item">เลือก เขต/อำเภอ</option>

                      {distric.map((item, index) => (
                        <option
                          key={index}
                          className="dropdown-item"
                          value={item.id}
                        >
                          {item.nameInThai}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col mb-3">
                    <select
                      className="form-control dropdown-toggle"
                      value={form.subdistrictId}
                      onChange={(e) => selectSubdistrict(e)}
                    >
                      <option className="dropdown-item">
                        เลือก แขวง/ตำบล
                      </option>
                      {subdistrict.map((item, index) => (
                        <option
                          key={index}
                          className="dropdown-item"
                          value={item.id}
                        >
                          {item.nameInThai}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={form.zipcode}
                      readOnly
                      placeholder="Zipcode"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label fw-bold">
                  ที่อยู่
                </label>
                <div className="col-md-9 mb-3">
                  <label className="px-2">{form.addressfull}</label>
                </div>
              </div>
            )}
            {edit === true ? (
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
                  <a href="/โปรไฟล์" className="btn btn-danger">
                    ยกเลิก
                  </a>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <button
        className="btn btn-danger mt-4"
        type="button"
        onClick={() => {
          deleteAccount();
        }}
      >
        ลบบัญชีผู้ใช้
      </button>
    </div>
  );
};

export default Profile;
